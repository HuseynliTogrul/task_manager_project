import { ChartEntry } from "../types";
import { formatChartData } from "../utils/helper";
import { RegisterResponse } from "../types/api";
import { useEffect, useState } from "react";

export const useCommon = () => {
  const [chartData, setChartData] = useState<ChartEntry[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          "https://sample-backend-15ml.onrender.com/api/users"
        );
        const data: RegisterResponse[] = await response.json();
        const formattedData = formatChartData(data);
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchChartData();
  }, []);

  return { chartData };
};
