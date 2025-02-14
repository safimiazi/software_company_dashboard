/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Modal,
  Upload,
  notification,
  Image,
  Popconfirm,
} from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import CustomTable from "../../utils/CustomTable";
import {
  useHomeAboutDeleteMutation,
  useHomeAboutPostMutation,
  useHomeAboutPutMutation,
} from "../../redux/api/adminApi/homePageApi/HomePageApi.mutation";
import { useGetHomePageAboutDataQuery } from "../../redux/api/adminApi/homePageApi/HomePageApi.query";
import { textFormat } from "../../utils/Format";
import { useServicesDeleteMutation, useServicesPostMutation, useServicesPutMutation } from "../../redux/api/adminApi/serviceApi/Service.mutation";

const Home_services = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: AboutData, refetch } = useGetHomePageAboutDataQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    search: globalFilter,
  });

  useEffect(() => {
    refetch();
  }, [pagination.pageIndex, pagination.pageSize]);

  const isDarkMode = false;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Editing, setEditing] = useState<any | null>(null);
  const [form] = Form.useForm();
  const [servicesPost, { isLoading: isPostLoading }] =
    useServicesPostMutation();
  const [servicesPut, { isLoading: isEditLoading }] =
    useServicesPutMutation();
  const [servicesDelete, { isLoading: isDeleteLoading }] =
    useServicesDeleteMutation();

  const handleAddOrUpdate = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("heading", values.heading || "");
      formData.append("ctaText", values.ctaText || "");
      formData.append("ctaLink", values.ctaLink || "");

      // Image Upload Handling
      if (values.image && values.image.file?.originFileObj) {
        formData.append("image", values.image.file?.originFileObj);
      }

      let res;
      if (Editing) {
        res = await servicesPut({
          data: formData,
          id: Editing._id,
        }).unwrap();
      } else {
        res = await servicesPost(formData).unwrap();
      }
      notification.success({
        message: res?.message,
        placement: "topRight",
      });

      refetch();
      setIsModalOpen(false);
      setEditing(null);
      form.resetFields();
    } catch (error: any) {
      console.log("ddd", error);
      notification.error({
        message:
          error?.data?.errorSource[0]?.message || "Something went wrong!",
        placement: "topRight",
      });
    }
  };

  const handleEdit = (record: any) => {
    setEditing(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await servicesDelete({ id }).unwrap();
      notification.success({
        message: res?.message,
        placement: "topRight",
      });
      setTimeout(() => {
        refetch();
      }, 500);
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something went wrong!",
        placement: "topRight",
      });
    }
  };

  const customColumns = [
    {
      header: "ACTION",
      size: 50,
      muiTableHeadCellProps: {
        sx: { color: `${isDarkMode ? "white" : "black"} ` },
      },
      Cell: ({ row }: any) => (
        <div className="flex justify-start gap-2">
          <Popconfirm
            title="Are you sure you want to delete this About?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(row._id)} // Executes delete on confirm
            okText="Yes, Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>

          <Button loading={isDeleteLoading} onClick={() => handleEdit(row)}>
            Edit
          </Button>
        </div>
      ),
    },
    {
      header: "IMAGE",
      Cell: ({ row }: any) => (
        <div className="w-20 h-20">
          <Image
            height={"100%"}
            width={"100%"}
            src={`${row.image}`}
          />
        </div>
      ),
    },
    {
      header: "HEADING",
      Cell: ({ row }: any) => (
        <div>
          <div className="flex flex-col gap-1 text-sm">
            <p>
              <span className="capitalize">{row.heading}</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "TITLE",
      Cell: ({ row }: any) => (
        <div>
          <div className="flex flex-col gap-1 text-sm">
            <p>
              <span className="capitalize">{row.title}</span>
            </p>
          </div>
        </div>
      ),
    },

    {
      header: "CTA TEXT",
      Cell: ({ row }: any) => (
        <div className="space-y-1 text-sm">
          <p>{row.ctaText}</p>
        </div>
      ),
    },
    {
      header: "CTA LINK",
      Cell: ({ row }: any) => (
        <div className="space-y-1 text-sm">
          <p>{row.ctaLink}</p>
        </div>
      ),
    },
    {
      header: "DESCRIPTION",
      Cell: ({ row }: any) => (
        <div className="space-y-1 text-sm">
          <p  title={`${row.description}`}>{textFormat(row.description, 10)}</p>
        </div>
      ),
    },
    {
      header: "CREATED DATE",
      Cell: ({ row }: any) => (
        <div className="space-y-1 text-sm">
          <p>
            {new Date(row.createdAt).toLocaleDateString("en", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add About
      </Button>
      <CustomTable
        columns={customColumns}
        data={AboutData?.data?.result || []}
        pagination={pagination}
        onPaginationChange={(pageIndex, pageSize) =>
          setPagination({ pageIndex, pageSize })
        }
        globalFilter={globalFilter}
        onFilterChange={setGlobalFilter}
        totalRecordCount={AboutData?.data?.meta?.total || 0}
      />
      <Modal
        title={Editing ? "Edit About" : "Add About"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditing(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddOrUpdate}>
          <Form.Item name="heading" label="Heading">
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="ctaText" label="CTA Button Text">
            <Input />
          </Form.Item>
          <Form.Item name="ctaLink" label="CTA Button Link">
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item name="image" label="Image">
            <Upload
              listType="picture"
              beforeUpload={(file) => {
                const isValidType =
                  file.type === "image/png" || file.type === "image/jpeg";
                if (!isValidType) {
                  notification.error({
                    message: "You can only upload PNG or JPG files!",
                    placement: "topRight",
                  });
                }
                return isValidType || Upload.LIST_IGNORE;
              }}
              maxCount={1}
              defaultFileList={
                Editing?.image
                  ? [
                      {
                        uid: "-1",
                        name: "existing_image.jpg",
                        status: "done",
                        url: `${Editing?.image}`, // Adjust URL
                      },
                    ]
                  : []
              }
            >
              {" "}
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              loading={Editing ? isEditLoading : isPostLoading}
              type="primary"
              htmlType="submit"
            >
              {Editing ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Home_services;
