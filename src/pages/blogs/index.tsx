import React, { useEffect, useState } from "react";
import { Button, Form, message, Popconfirm, Table, Typography } from "antd";
import type { BlogValues, DataType } from "../../types";
import { useBlog } from "../../hooks";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ModalBlog } from "./ModalBlog";
import { deleteBlogApi } from "../../services";

export const Blogs = (): React.ReactElement => {
  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 6
  });
  const [rerender, setRerender] = useState<boolean>(false);
  const { data } = useBlog(rerender);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();
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
      render: (item: DataType) => {
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
            <Typography.Link>
              <EditOutlined
                title="Edit"
                className="cursor-pointer rounded-[50%] p-[9px] text-[#ffa000] border border-solid border-[#ffa000]"
              />
            </Typography.Link>
          </>
        );
      }
    }
  ];

  return (
    <>
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
          dataSource={data}
          bordered
          columns={columns}
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
      {
        isModalOpen && <ModalBlog
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        rerender={rerender}
        setRerender={setRerender}
        setModalVisibility={setIsModalOpen}
      />
      }
    </>
  );
};
