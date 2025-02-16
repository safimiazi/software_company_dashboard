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

import { textFormat } from "../../utils/Format";
import { useGetsection_headerDataQuery } from "../../redux/api/adminApi/sectionHeaderApi/SectionHeader.query";
import {
  useSection_headerDeleteMutation,
  useSection_headerPostMutation,
  useSection_headerPutMutation,
} from "../../redux/api/adminApi/sectionHeaderApi/SectionHeader.mutation";

const Section_header = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: data, refetch } = useGetsection_headerDataQuery({
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
  const [section_headerPost, { isLoading: isPostLoading }] =
    useSection_headerPostMutation();
  const [section_headerPut, { isLoading: isEditLoading }] =
    useSection_headerPutMutation();
  const [section_headerDelete, { isLoading: isDeleteLoading }] =
    useSection_headerDeleteMutation();

  const handleAddOrUpdate = async (values: any) => {
    try {
    
      let res;
      if (Editing) {
        res = await section_headerPut({
          data: values,
          id: Editing._id,
        }).unwrap();
      } else {
        res = await section_headerPost(values).unwrap();
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
      const res = await section_headerDelete({ id }).unwrap();
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
        Add section header
      </Button>
      <CustomTable
        columns={customColumns}
        data={data?.data?.result || []}
        pagination={pagination}
        onPaginationChange={(pageIndex, pageSize) =>
          setPagination({ pageIndex, pageSize })
        }
        globalFilter={globalFilter}
        onFilterChange={setGlobalFilter}
        totalRecordCount={data?.data?.meta?.total || 0}
      />
      <Modal
        title={Editing ? "Edit" : "Add"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditing(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddOrUpdate}>
          <Form.Item
            name="heading"
            label="Heading"
            rules={[{ required: true, message: "Please enter heading" }]}
          >
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

export default Section_header;
