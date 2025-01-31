import React, { useEffect, useState } from "react";
import { message, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Loading } from "../../components";
import type { TaskEntry, TodoEntry } from "../../types";
import axios from "axios";

const fetchData = async <T,>(
  url: string,
  setState: React.Dispatch<React.SetStateAction<T[]>>
) => {
  try {
    const res = await axios.get(url);
    setState(res.data.users || res.data.todos);
  } catch {
    message.error("Error fetching data");
  }
};

export const Tasks = (): React.ReactElement => {
  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 9
  });

  const [users, setUsers] = useState<TaskEntry[]>([]);
  const [todos, setTodos] = useState<TodoEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedRowKey, setExpandedRowKey] = useState<string | null>(null);

  useEffect(() => {
    fetchData<TaskEntry>("https://dummyjson.com/users", setUsers);
    fetchData<TodoEntry>("https://dummyjson.com/todos", setTodos);
  }, []);

  useEffect(() => {
    if (users.length > 0 && todos.length > 0) {
      setIsLoading(false);
    }
  }, [users, todos]);

  const columns: ColumnsType<TaskEntry> = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      render: (_, __, index: number) =>
        index + 1 + (tableParams.current - 1) * tableParams.pageSize
    },
    {
      title: "Firstname",
      dataIndex: "firstName",
      key: "firstName"
    },
    {
      title: "Lastname",
      dataIndex: "lastName",
      key: "lastName"
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "Birth Date",
      dataIndex: "birthDate",
      key: "birthDate"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role"
    }
  ];

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Table<TaskEntry>
          dataSource={users}
          style={{ padding: 0 }}
          rowKey="id"
          bordered
          columns={columns}
          pagination={{
            position: ["bottomCenter"],
            ...tableParams
          }}
          expandable={{
            expandedRowRender: (record) => {
              const relatedTodos = todos.filter(
                (todo: TodoEntry) => todo.userId === record.id
              );
              return (
                <ul className="flex flex-col gap-[30px]">
                  {relatedTodos.length > 0 ? (
                    relatedTodos.map((todo: TodoEntry, id) => (
                      <li
                        key={id}
                        className="bg-[lightblue] py-5 px-3 m-[-16px] text-base shadow-[rgba(50,50,93,0.25)_0px_50px_100px_-20px,rgba(0,0,0,0.3)_0px_30px_60px_-30px,rgba(10,37,64,0.35)_0px_-2px_6px_0px_inset]"
                      >
                        {todo.todo}
                      </li>
                    ))
                  ) : (
                    <li>No todos</li>
                  )}
                </ul>
              );
            },
            rowExpandable: (record) => {
              const relatedTodos = todos.filter(
                (todo: TodoEntry) => todo.userId === record.id
              );
              return relatedTodos.length > 0;
            },
            expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
            onExpand: (expanded, record) => {
              setExpandedRowKey(expanded ? record.id : null);
            }
          }} 
          onChange={(pagination) => {
            setTableParams({
              ...tableParams,
              current: pagination.current || 1
            });
          }}
          rowClassName={() => "hover:bg-gray-200 transition duration-300"}
          className="[&_.ant-spin-container]:h-[84vh] [&_.ant-spin-container]:flex [&_.ant-spin-container]:flex-col [&_.ant-spin-container]:justify-between"
        />
      )}
    </>
  );
};
