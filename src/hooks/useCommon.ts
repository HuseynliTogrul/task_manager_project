import { axiosInstanceApi } from "./../api/axiosInstanceApi";
import { ChartEntry, RegisterResponse } from "../types";
import { formatChartData } from "../utils";
import { useEffect, useState } from "react";

export const useCommon = () => {
  const [chartData, setChartData] = useState<ChartEntry[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      const axiosInstance = axiosInstanceApi();
      try {
        const res = await axiosInstance.get("/users");
        const data: RegisterResponse[] = await res.data;
        const formattedData = formatChartData(data);
        setChartData(formattedData);
      } catch (error) {
        return error;
      }
    };
    fetchChartData();
  }, []);

  return { chartData };
};
