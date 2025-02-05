/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Modal,
  Upload,
  message,
  notification,
  Image,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CustomTable from "../../utils/CustomTable";
import { useGetHomePageBannerDataQuery } from "../../redux/api/adminApi/homePageApi/HomePageApi.query";
import {
  useHomeBannerDeleteMutation,
  useHomeBannerPostMutation,
  useHomeBannerPutMutation,
} from "../../redux/api/adminApi/homePageApi/HomePageApi.mutation";
import { home_banner_image_api } from "../../Proxy";

const Home_banner = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: bannerData, refetch } = useGetHomePageBannerDataQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    search: globalFilter,
  });

  useEffect(() => {
    refetch();
  }, [pagination.pageIndex, pagination.pageSize]);

  const isDarkMode = false;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any | null>(null);
  const [form] = Form.useForm();
  const [homeBannerPost, { isLoading: isPostLoading }] =
    useHomeBannerPostMutation();
  const [homeBannerPut, { isLoading: isEditLoading }] =
    useHomeBannerPutMutation();
  const [homeBannerDelete, { isLoading: isDeleteLoading }] =
    useHomeBannerDeleteMutation();

  const handleAddOrUpdate = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("ctaText", values.ctaText || "");
      formData.append("ctaLink", values.ctaLink || "");

      // Image Upload Handling
      if (values.image && values.image.file?.originFileObj) {
        formData.append("image", values.image.file?.originFileObj);
      }

      let res;
      if (editingBanner) {
        res = await homeBannerPut({
          data: formData,
          id: editingBanner._id,
        }).unwrap();
      } else {
        res = await homeBannerPost(formData).unwrap();
      }
      notification.success({
        message: res?.message,
        placement: "topRight",
      });

      refetch();
      setIsModalOpen(false);
      setEditingBanner(null);
      form.resetFields();
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something went wrong!",
        placement: "topRight",
      });
    }
  };

  const handleEdit = (record: any) => {
    setEditingBanner(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await homeBannerDelete({ id }).unwrap();
      notification.success({
        message: res?.message,
        placement: "topRight",
      });
      refetch();
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something went wrong!",
        placement: "topRight",
      });
    }
  };

  const customColumns = [
    {
      header: "IMAGE",
      Cell: ({ row }: any) => (
        <div className="w-20 h-20">
          <Image
            height={"100%"}
            width={"100%"}
            src={`${home_banner_image_api}/${row._id}`}
          />
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
          <p>{row.description}</p>
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

    {
      header: "ACTION",
      size: 50,
      muiTableHeadCellProps: {
        sx: { color: `${isDarkMode ? "white" : "black"} ` },
      },
      Cell: ({ row }: any) => (
        <div className="flex justify-start gap-2">
          <button
            onClick={() => handleDelete(row._id)}
            className="bg-[#ef4444] py-1 px-2 rounded-md text-white"
          >
            Delete
          </button>

          <Button loading={isDeleteLoading} onClick={() => handleEdit(row)}>
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add Banner
      </Button>
      <CustomTable
        columns={customColumns}
        data={bannerData?.data?.result || []}
        pagination={pagination}
        onPaginationChange={(pageIndex, pageSize) =>
          setPagination({ pageIndex, pageSize })
        }
        globalFilter={globalFilter}
        onFilterChange={setGlobalFilter}
        totalRecordCount={bannerData?.data?.meta?.total || 0}
      />
      <Modal
        title={editingBanner ? "Edit Banner" : "Add Banner"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingBanner(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddOrUpdate}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="ctaText" label="CTA Button Text">
            <Input />
          </Form.Item>
          <Form.Item name="ctaLink" label="CTA Button Link">
            <Input />
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
                editingBanner?.image
                  ? [
                      {
                        uid: "-1",
                        name: "existing_image.jpg",
                        status: "done",
                        url: `${home_banner_image_api}/${editingBanner._id}`, // Adjust URL
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
              loading={editingBanner ? isEditLoading : isPostLoading}
              type="primary"
              htmlType="submit"
            >
              {editingBanner ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Home_banner;
