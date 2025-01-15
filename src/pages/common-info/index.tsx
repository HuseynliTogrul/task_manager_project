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
import { message, Select } from "antd";
import { Loading } from "../../components";

type CustomDate = [number, number, number];

export const Dashboard = (): React.ReactElement => {
  const [data, setData] = useState<{ day: string; count: number }[]>([]);
  const [isloading, setIsLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commonInfo = await commonInfoApi();

        const today = new Date();
        const totalDays = selectedRange * 7;
        const lastNDays = Array.from({ length: totalDays }, (_, i) => {
          const day = new Date();
          day.setDate(today.getDate() - i);
          return day.toLocaleDateString();
        }).reverse();

        const blogCounts: Record<string, number> = lastNDays.reduce(
          (acc, day) => {
            acc[day] = 0;
            return acc;
          },
          {} as Record<string, number>
        );

        commonInfo.forEach((blog: BlogResponse) => {
          const updatedAt = new Date(blog.updatedAt).toLocaleDateString();
          if (updatedAt in blogCounts) {
            blogCounts[updatedAt]++;
          }
        });

        const chartData = Object.entries(blogCounts)
          .map(([date, count]): [CustomDate, number] => [
            date.split(".").map((n) => +n) as CustomDate,
            count
          ])
          .map(([date, count]) => ({
            day: new Date(date[2], date[1] - 1, date[0]).toLocaleDateString(
              "en-US",
              {
                weekday: "long"
              }
            ),
            count
          }));
        setData(chartData);
      } catch {
        message.error("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isloading ? (
        <Loading />
      ) : (
        <div>
          <h3 className="text-center mb-4 text-lg">Weekly Blog Chart</h3>
          <div style={{ marginBottom: "10px" }}>
            <Select
              value={selectedRange}
              onChange={(value) => setSelectedRange(value)}
              style={{ width: 120 }}
            >
              <Select.Option value={1}>1 Week</Select.Option>
              <Select.Option value={2}>2 Weeks</Select.Option>
              <Select.Option value={3}>3 Weeks</Select.Option>
              <Select.Option value={4}>4 Weeks</Select.Option>
            </Select>
          </div>
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
      )}
    </div>
  );
};
