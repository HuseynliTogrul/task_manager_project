import { useState } from "react";
import { TablePaginationConfig } from "antd";

export function useTablePagination({ current = 1, pageSize = 10 }) {
  const [tableParams, setTableParams] = useState<TablePaginationConfig>({
    current,
    pageSize
  });

  return {
    tableParams,
    setTableParams
  };
}
