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
  useProjectDeleteMutation,
  useProjectPostMutation,
  useProjectPutMutation,
} from "../../redux/api/adminApi/projectApi/Project.mutarion";
import { useGetProjectDataQuery } from "../../redux/api/adminApi/projectApi/Project.query";

const { TextArea } = Input;

const Project = () => {
  const [form] = Form.useForm();
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: data, refetch } = useGetProjectDataQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    search: globalFilter,
  });
  const [projectPost, { isLoading: isPostLoading }] = useProjectPostMutation();
  const [projectPut, { isLoading: isEditLoading }] = useProjectPutMutation();
  const [projectDelete, { isLoading: isDeleteLoading }] =
    useProjectDeleteMutation();

  const handleAddOrUpdate = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("stars", values.stars);
      formData.append("demoUrl", values.demoUrl);
      formData.append("githubUrl", values.githubUrl);
      formData.append("overview", values.overview);

      // Handling array fields (technologies, features, challenges, impact)
      values.technologies?.forEach((tech: string, index: number) => {
        formData.append(`technologies[${index}]`, tech);
      });

      values.features?.forEach((feature: string, index: number) => {
        formData.append(`features[${index}]`, feature);
      });

      values.challenges?.forEach((challenge: string, index: number) => {
        formData.append(`challenges[${index}]`, challenge);
      });

      values.impact?.forEach((impactItem: string, index: number) => {
        formData.append(`impact[${index}]`, impactItem);
      });

      // Handling Image Upload
      if (values.image && values.image.file?.originFileObj) {
        formData.append("image", values.image.file.originFileObj);
      }

      let res;
      if (editingProject) {
        res = await projectPut({
          data: formData,
          id: editingProject._id,
        }).unwrap();
      } else {
        res = await projectPost(formData).unwrap();
      }

      notification.success({
        message: res?.message,
        placement: "topRight",
      });

      refetch();
      setIsModalOpen(false);
      form.resetFields();
      setEditingProject(null);
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something went wrong!",
        placement: "topRight",
      });
    }
  };

  // Open modal for editing project
  const handleEdit = (project: any) => {
    setEditingProject(project);
    form.setFieldsValue(project);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await projectDelete({ id }).unwrap();
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
      header: "RATING",
      Cell: ({ row }: any) => (
        <div>
          <div className="flex flex-col gap-1 text-sm">
            <p>
              <span className="capitalize">{row.rating}</span>
            </p>
          </div>
        </div>
      ),
    },

    {
      header: "PROJECT OVERVIEW",
      Cell: ({ row }: any) => (
        <div className="space-y-1 text-sm">
          <p title={`${row.overview}`}>{textFormat(row.overview, 10)}</p>
        </div>
      ),
    },

    {
      header: "DESCRIPTION",
      Cell: ({ row }: any) => (
        <div className="space-y-1 text-sm">
          <p title={`${row.description}`}>{textFormat(row.description, 10)}</p>
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
          Add New Project
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
        title={editingProject ? "Edit Project" : "Add New Project"}
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
            label="Project Title"
            rules={[{ required: true, message: "Please enter project title" }]}
          >
            <Input placeholder="Enter project title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Short Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input placeholder="Enter short description" />
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
                editingProject?.image
                  ? [
                      {
                        uid: "-1",
                        name: "existing_image.jpg",
                        status: "done",
                        url: `${editingProject.image}`, // Adjust URL
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
                    {editingProject ? "Edit Technology" : "Add Technology"}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item
            name="stars"
            label="Rating"
            rules={[{ required: true, message: "Please enter rating" }]}
          >
            <InputNumber min={0} max={5} step={0.1} />
          </Form.Item>

          <Form.Item
            name="demoUrl"
            label="Demo URL"
          >
            <Input placeholder="Enter demo URL" />
          </Form.Item>

          <Form.Item
            name="githubUrl"
            label="GitHub URL"
          >
            <Input placeholder="Enter GitHub URL" />
          </Form.Item>

          <Form.List name="features">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} align="baseline">
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[
                        { required: true, message: "Please enter feature" },
                      ]}
                    >
                      <Input placeholder="Enter feature" />
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
                    {editingProject ? "Edit Feature" : "Add Feature"}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item
            name="overview"
            label="Project Overview"
            rules={[
              { required: true, message: "Please enter project overview" },
            ]}
          >
            <TextArea rows={4} placeholder="Enter project overview" />
          </Form.Item>

          <Form.List name="challenges">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} align="baseline">
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[
                        { required: true, message: "Please enter challenge" },
                      ]}
                    >
                      <Input placeholder="Enter challenge" />
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
                    {editingProject ? "Edit Challenge" : " Add Challenge"}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.List name="impact">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} align="baseline">
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[
                        { required: true, message: "Please enter impact" },
                      ]}
                    >
                      <Input placeholder="Enter impact" />
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
                    {editingProject ? " Edit Impact" : " Add Impact"}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              {editingProject ? "Edit Project" : "Add Project"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Project;
