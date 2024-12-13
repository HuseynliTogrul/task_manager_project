import React from "react";
import { Table } from "antd";
import type { DataType } from "../../types";
import { useTablePagination, useUser } from "../../hooks";
import { ColumnSearchProps } from "./SearchProps";

export const Users = (): React.ReactElement => {
  const { tableParams, handleTableChange } = useTablePagination({
    current: 1,
    pageSize: 9
  });
  const { data } = useUser();
  const [columns] = ColumnSearchProps();

  return (
    <Table<DataType>
      dataSource={data}
      bordered
      columns={columns}
      pagination={{
        position: ["bottomCenter"],
        ...tableParams
      }}
      onChange={handleTableChange}
      rowClassName={() => "hover:bg-gray-200 transition duration-300"}
      className="[&_.ant-spin-container]:h-[84vh] [&_.ant-spin-container]:flex [&_.ant-spin-container]:flex-col [&_.ant-spin-container]:justify-between"
    />
  );
};
