import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import type { BlogResponse } from "../../types";
import { commonInfoApi } from "../../services";
import { message } from "antd";

export const Dashboard = (): React.ReactElement => {
  const [data, setData] = useState<{ day: string; count: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commonInfo = await commonInfoApi();

        const today = new Date();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const day = new Date();
          day.setDate(today.getDate() - i);
          return day.toLocaleDateString("en-US", { weekday: "long" });
        }).reverse();

        const blogCounts: Record<string, number> = last7Days.reduce(
          (acc, day) => {
            acc[day] = 0;
            return acc;
          },
          {} as Record<string, number>
        );

        commonInfo.forEach((blog: BlogResponse) => {
          const createdAt = new Date(blog.createdAt);
          const dayName = createdAt.toLocaleDateString("en-US", {
            weekday: "long"
          });
          if (dayName in blogCounts) {
            blogCounts[dayName]++;
          }
        });

        const chartData = Object.entries(blogCounts).map(([day, count]) => ({
          day,
          count
        }));
        setData(chartData);
      } catch {
        message.error("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3 className="text-center mb-4 text-lg">Weekly Blog Chart</h3>
      {!!data.length && (
        <LineChart
          width={800}
          height={300}
          data={data}
          style={{ width: "100%" }}
        >
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
        </LineChart>
      )}
    </div>
  );
};
