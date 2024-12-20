import { axiosInstanceApi } from "./../api/axiosInstanceApi";
import { useState, useEffect } from "react";
import { DataType, RegisterResponse } from "../types";
import { formatData } from "../utils";

export function useUser() {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const axiosInstance = axiosInstanceApi();
      try {
        const res = await axiosInstance.get("/users");
        const data: RegisterResponse[] = await res.data;
        const formattedData = formatData(data);
        setData(formattedData);
      } catch (error) {
        return error;
      }
    };

    fetchData();
  }, []);

  return { data };
}
