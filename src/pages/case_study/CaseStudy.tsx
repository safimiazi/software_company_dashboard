/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import {
  Form,
  Input,
  InputNumber,
  Button,
  message,
  Space,
  Modal,
  Popconfirm,
  Image,
  notification,
  Upload,
  Select,
} from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import CustomTable from "../../utils/CustomTable";
import { textFormat } from "../../utils/Format";

import {
  useCase_studyDeleteMutation,
  useCase_studyPostMutation,
  useCase_studyPutMutation,
} from "../../redux/api/adminApi/caseStudyApi/CaseStudy.mutation";
import { useGetcase_studyDataQuery } from "../../redux/api/adminApi/caseStudyApi/CaseStudy.query";
import { useGetsection_headerDataQuery } from "../../redux/api/adminApi/sectionHeaderApi/SectionHeader.query";

const { TextArea } = Input;

const CaseStudy = () => {
  const [form] = Form.useForm();
  const [EditingCaseStudy, setEditingCaseStudy] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: data, refetch } = useGetcase_studyDataQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });
  const { data: sectionHeader } = useGetsection_headerDataQuery({});

  console.log("sectionHeader", sectionHeader);
  const [case_studyPost, { isLoading: isPostLoading }] =
    useCase_studyPostMutation();
  const [case_studyPut, { isLoading: isEditLoading }] =
    useCase_studyPutMutation();
  const [case_studyDelete, { isLoading: isDeleteLoading }] =
    useCase_studyDeleteMutation();

  const handleAddOrUpdate = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("client", values.client);
      formData.append("category", values.category);
      formData.append("duration", values.duration);
      formData.append("challenge", values.challenge);
      formData.append("solution", values.solution);

      values.results?.forEach((result: string, index: number) => {
        formData.append(`results[${index}]`, result);
      });
      values.technologies?.forEach((tech: string, index: number) => {
        formData.append(`technologies[${index}]`, tech);
      });

      // Append each field of the testimonial object individually
      Object.keys(values.testimonial).forEach((key: string) => {
        formData.append(`testimonial.${key}`, values.testimonial[key]);
      });

      // Handling Image Upload
      if (values.image && values.image.file?.originFileObj) {
        formData.append("image", values.image.file.originFileObj);
      }

      let res;
      if (EditingCaseStudy) {
        res = await case_studyPut({
          data: formData,
          id: EditingCaseStudy._id,
        }).unwrap();
      } else {
        res = await case_studyPost(formData).unwrap();
      }

      notification.success({
        message: res?.message,
        placement: "topRight",
      });

      refetch();
      setIsModalOpen(false);
      form.resetFields();
      setEditingCaseStudy(null);
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something went wrong!",
        placement: "topRight",
      });
    }
  };

  const handleEdit = (project: any) => {
    setEditingCaseStudy(project);
    form.setFieldsValue(project);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await case_studyDelete({ id }).unwrap();
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
  const isDarkMode = false;
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
          <Image height={"100%"} width={"100%"} src={`${row.image}`} />
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
      header: "CLIENT",
      Cell: ({ row }: any) => (
        <div>
          <div className="flex flex-col gap-1 text-sm">
            <p>
              <span className="capitalize">{row.client}</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "DURATION",
      Cell: ({ row }: any) => (
        <div>
          <div className="flex flex-col gap-1 text-sm">
            <p>
              <span className="capitalize">{row.duration}</span>
            </p>
          </div>
        </div>
      ),
    },

    {
      header: "CHALLENGE",
      Cell: ({ row }: any) => (
        <div className="space-y-1 text-sm">
          <p title={`${row.challenge}`}>{textFormat(row.challenge, 10)}</p>
        </div>
      ),
    },

    {
      header: "SOLUTION",
      Cell: ({ row }: any) => (
        <div className="space-y-1 text-sm">
          <p title={`${row.solution}`}>{textFormat(row.solution, 10)}</p>
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add New Case Study
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
      </div>

      <Modal
        title={EditingCaseStudy ? "Edit Case Study" : "Add New Case Study"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddOrUpdate}
          autoComplete="off"
        >
          <Form.Item
            name="title"
            label="Case Study Title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>
          <Form.Item
            name="sectionHeader"
            label="Section Header"
            rules={[{ required: true, message: "Please enter section header" }]}
          >
            <Select
              options={sectionHeader.data.result.map((item: any) => {
                return { value: item._id, label: item.title };
              })}
              placeholder="Please select section header"
            />
          </Form.Item>

          <Form.Item
            name="client"
            label="Client"
            rules={[{ required: true, message: "Please enter client" }]}
          >
            <Input placeholder="Enter client" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please enter category" }]}
          >
            <Input placeholder="Enter category" />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true, message: "Please enter duration" }]}
          >
            <Input placeholder="Enter duration" />
          </Form.Item>
          <Form.Item
            name="challenge"
            label="Challenge"
            rules={[{ required: true, message: "Please enter challenge" }]}
          >
            <TextArea rows={4} placeholder="Enter challenge" />
          </Form.Item>
          <Form.Item
            name="solution"
            label="Solution"
            rules={[{ required: true, message: "Please enter solution" }]}
          >
            <TextArea rows={4} placeholder="Enter solution" />
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
                EditingCaseStudy?.image
                  ? [
                      {
                        uid: "-1",
                        name: "existing_image.jpg",
                        status: "done",
                        url: `${EditingCaseStudy.image}`, // Adjust URL
                      },
                    ]
                  : []
              }
            >
              {" "}
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Form.List name="technologies">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} align="baseline">
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[
                        { required: true, message: "Please enter technology" },
                      ]}
                    >
                      <Input placeholder="Enter technology" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    {EditingCaseStudy ? "Edit Technology" : "Add Technology"}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.List name="results">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} align="baseline">
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[
                        { required: true, message: "Please enter result" },
                      ]}
                    >
                      <Input placeholder="Enter result" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    {EditingCaseStudy ? "Edit Result" : "Add Result"}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          {/* Testimonial Section */}
          <Form.Item
            name={["testimonial", "quote"]}
            label="Testimonial Quote"
            rules={[
              { required: true, message: "Please enter testimonial quote" },
            ]}
          >
            <TextArea rows={2} placeholder="Enter testimonial quote" />
          </Form.Item>

          <Form.Item
            name={["testimonial", "author"]}
            label="Testimonial Author"
            rules={[{ required: true, message: "Please enter author" }]}
          >
            <Input placeholder="Enter author name" />
          </Form.Item>

          <Form.Item
            name={["testimonial", "position"]}
            label="Author Position"
            rules={[
              { required: true, message: "Please enter author position" },
            ]}
          >
            <Input placeholder="Enter author position" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              {EditingCaseStudy ? "Edit Case Study" : "Add Case Study"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CaseStudy;
