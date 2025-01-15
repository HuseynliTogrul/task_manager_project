import { useState, useEffect } from "react";
import { message } from "antd";
import { axiosInstanceApi } from "../api";
import { formatData } from "../utils";
import type { DataType, RegisterResponse } from "../types";

export function useUser() {
  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const axiosInstance = axiosInstanceApi();
      try {
        const res = await axiosInstance.get("/users");
        const data: RegisterResponse[] = await res.data;
        const formattedData = formatData(data);
        setData(formattedData);
      } catch {
        message.error("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading };
}
