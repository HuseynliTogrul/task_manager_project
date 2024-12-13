import { useState, useEffect } from "react";
import { DataType, RegisterResponse } from "../types";

export function useUser() {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    fetch(`https://sample-backend-15ml.onrender.com/api/users`)
      .then((res) => res.json())
      .then((users) => {
        const formattedData = users.map(
          (user: RegisterResponse, index: number) => ({
            key: `${index + 1}`,
            username: user.username,
            name: `${user.username || ""} ${user.name || ""}`
          })
        );
        setData(formattedData);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return { data };
}
