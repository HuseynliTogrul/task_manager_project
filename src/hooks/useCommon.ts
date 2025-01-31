import { useEffect, useState } from "react";
import { message } from "antd";
import { axiosInstanceApi } from "../api";
import { formatChartData } from "../utils";
import type { ChartEntry, RegisterResponse } from "../types";

export const useCommon = () => {
  const [chartData, setChartData] = useState<ChartEntry[]>([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      const axiosInstance = axiosInstanceApi();
      try {
        const res = await axiosInstance.get("/users");
        const data: RegisterResponse[] = await res.data;
        const formattedData = formatChartData(data);
        setChartData(formattedData);
      } catch {
        message.error("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchChartData();
  }, []);

  return { chartData, isloading };
};
