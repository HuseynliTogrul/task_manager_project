import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useUser } from "../../hooks";
import { ColumnSearchProps } from "./SearchProps";
import { ColumnsType } from "antd/es/table";
import type { DataType } from "../../types";

export const Users = (): React.ReactElement => {
  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 9
  });
  const { data } = useUser();
  const getColumnSearchProps = ColumnSearchProps();
  const [currentTableSource, setCurrentTableSource] = useState(0);

  useEffect(() => {
    if (data) setCurrentTableSource(data.length);
  }, [data, currentTableSource]);

  const columns: ColumnsType<DataType> = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: "10%",
      render: (_: unknown, __: unknown, index: number) => {
        return index + 1 + (tableParams.current - 1) * tableParams.pageSize;
      }
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "40%",
      ...getColumnSearchProps
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "40%",
      ...getColumnSearchProps
    }
  ];

  return (
    <Table<DataType>
      dataSource={data}
      bordered
      columns={columns}
      pagination={{
        position: ["bottomCenter"],
        ...tableParams
      }}
      onChange={(pagination, _, __, extra) => {
        setCurrentTableSource(extra.currentDataSource.length);
        setTableParams({
          ...tableParams,
          current: pagination.current || 1
        });
      }}
      rowClassName={() => "hover:bg-gray-200 transition duration-300"}
      className="[&_.ant-spin-container]:h-[84vh] [&_.ant-spin-container]:flex [&_.ant-spin-container]:flex-col [&_.ant-spin-container]:justify-between"
    />
  );
};
