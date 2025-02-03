/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Form, Input, Button, Modal, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CustomTable from "../../utils/CustomTable";
import { useGetHomePageBannerDataQuery } from "../../redux/api/adminApi/homePageApi/HomePageApi.query";
import {
  useHomeBannerDeleteMutation,
  useHomeBannerPostMutation,
  useHomeBannerPutMutation,
} from "../../redux/api/adminApi/homePageApi/HomePageApi.mutation";

const Home_banner = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: bannerData, refetch } = useGetHomePageBannerDataQuery({
    pagination,
    search: globalFilter,
  });
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
      if (editingBanner) {
        const res = await homeBannerPut({ values, id: editingBanner.id });
      } else {
        const res = await homeBannerPost(values);
      }
      refetch();
      setIsModalOpen(false);
      setEditingBanner(null);
      form.resetFields();
    } catch (error) {
      message.error("Failed to save banner.");
    }
  };

  const handleEdit = (record: any) => {
    setEditingBanner(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await homeBannerDelete({ id });
      refetch();
    } catch (error) {
      message.error("Failed to delete banner.");
    }
  };

  const customColumns = [
    {
      header: "AGENCY INFO",
      Cell: ({ row }: any) => (
        <div>
          <div className="flex flex-col gap-1 text-sm">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              <span className="capitalize">{row.agency.name}</span>
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <span className="capitalize">{row.agency.email}</span>
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {row.agency.address}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {row.agency.phone}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {row.agency.status}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "DATE",
      Cell: ({ row }: any) => (
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-semibold">Submitted:</span>{" "}
            {new Date(row.createdAt).toLocaleDateString("en", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </p>
          <p>
            <span className="font-semibold">Departure:</span>{" "}
            {new Date(row.departure_date).toLocaleDateString("en", {
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
            onClick={() => handleDelete(row.id)}
            className="bg-[#ef4444] py-1 px-2 rounded-md text-white"
          >
            Delete
          </button>

          <Button loading={isDeleteLoading} onClick={() => handleEdit(row.id)}>
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
        data={bannerData?.data || []}
        pagination={pagination}
        onPaginationChange={(pageIndex, pageSize) =>
          setPagination({ pageIndex, pageSize })
        }
        globalFilter={globalFilter}
        onFilterChange={setGlobalFilter}
        totalRecordCount={bannerData?.count || 0}
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
            <Upload listType="picture" beforeUpload={() => false} maxCount={1}>
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
