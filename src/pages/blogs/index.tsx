import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  CheckOutlined
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Table,
  Typography
} from "antd";
import { ModalBlog } from "./ModalBlog";
import { useBlog } from "../../hooks";
import type { BlogValues, DataType } from "../../types";
import { deleteBlogApi, updateBlogApi } from "../../services";
import { Loading } from "../../components";

export const Blogs = (): React.ReactElement => {
  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 6
  });
  const [rerender, setRerender] = useState<boolean>(false);
  const { data, setData, isLoading } = useBlog(rerender);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string>("");

  const [currentTableSource, setCurrentTableSource] = useState(0);

  const handleDelete = async (key: string, currentSource: number) => {
    await deleteBlogApi(key);
    setRerender(!rerender);
    if (currentSource % tableParams.pageSize === 1) {
      setTableParams({
        ...tableParams,
        current: tableParams.current - 1
      });
    }
    message.success("Blog successfully deleted");
  };

  interface EditableCellProps {
    editing: boolean;
    dataIndex: string;
    title: React.ReactNode;
    inputType: "number" | "text";
    item: BlogValues;
    index: number;
    children: React.ReactNode;
    onCancel: () => void;
  }

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === "number" ? <InputNumber /> : <Input type={inputType} />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`
              }
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const isEditing = (item: BlogValues) => item.key === editingKey;

  const edit = (item: BlogValues) => {
    form.setFieldsValue({ ...item });
    setEditingKey(item.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: string) => {
    try {
      const row = (await form.validateFields()) as BlogValues;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        await updateBlogApi(key, row);
        setRerender(!rerender);
        setData(newData);
        setEditingKey("");
        message.success("Changes saved successfully");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch {
      message.error("Failed to save changes");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setRerender(!rerender);
  };

  useEffect(() => {
    if (data) setCurrentTableSource(data.length);
  }, [data, currentTableSource]);

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      render: (_: DataType, __: BlogValues, index: number) => {
        return index + 1 + (tableParams.current - 1) * tableParams.pageSize;
      }
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      editable: true
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      editable: true
    },
    {
      title: "Actions",
      key: "actions",
      render: (item: BlogValues) => {
        const editable = isEditing(item);
        return (
          <>
            <Popconfirm
              title="Are you sure to delete this blog?"
              onConfirm={() => {
                handleDelete(item.key, currentTableSource);
              }}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined
                className="cursor-pointer rounded-[50%] mr-5 p-[9px] text-red-500 border border-solid border-red-500"
                title="Delete"
              />
            </Popconfirm>
            {editable ? (
              <Typography.Link onClick={() => save(item.key)}>
                <CheckOutlined
                  title="Save"
                  className="cursor-pointer rounded-[50%] p-[9px] text-green-500 border border-solid border-green-500"
                />
              </Typography.Link>
            ) : (
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(item)}
              >
                <EditOutlined
                  title="Edit"
                  className="cursor-pointer rounded-[50%] p-[9px] text-[#ffa000] border border-solid border-[#ffa000]"
                />
              </Typography.Link>
            )}
          </>
        );
      }
    }
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (item: BlogValues) => ({
        item,
        inputType: col.dataIndex === "url" ? "url" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(item),
        onCancel: cancel
      })
    };
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="text-end ">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="!py-[10px] !h-full !mb-5 border border-green-700 bg-white text-green-700 hover:!bg-green-700"
              onClick={showModal}
            >
              Blog əlavə et
            </Button>
          </div>
          <Form
            form={form}
            component={false}
          >
            <Table
              components={{
                body: { cell: EditableCell }
              }}
              bordered
              dataSource={data}
              columns={mergedColumns}
              pagination={{
                position: ["bottomCenter"],
                className: "!mb-0",
                ...tableParams
              }}
              onChange={(pagination, _, __, extra) => {
                setCurrentTableSource(extra.currentDataSource.length);
                setTableParams({
                  ...tableParams,
                  current: pagination.current || 1
                });
              }}
              rowClassName={() =>
                "editable-row hover:bg-gray-200 transition duration-300"
              }
              className="[&_.ant-spin-container]:h-[72vh] [&_.ant-spin-container]:flex [&_.ant-spin-container]:flex-col [&_.ant-spin-container]:justify-between"
            />
          </Form>
          {isModalOpen && (
            <ModalBlog
              handleCancel={handleCancel}
              isModalOpen={isModalOpen}
              rerender={rerender}
              setRerender={setRerender}
              setModalVisibility={setIsModalOpen}
            />
          )}
        </div>
      )}
    </>
  );
};
