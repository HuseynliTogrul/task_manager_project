import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/plots";
import type { BlogResponse } from "../../types";
import { commonInfoApi } from "../../services";

export const Dashboard: React.FC = () => {
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
      } catch (error) {
        return error;
      }
    };

    fetchData();
  }, []);

  const config = {
    data,
    xField: "day",
    yField: "count",
    point: {
      size: 5,
      shape: "diamond"
    },
    xAxis: {
      title: { text: "Days of the Week" }
    },
    yAxis: {
      title: { text: "Number of Blogs" },
      min: 0
    },
    tooltip: {
      formatter: (datum: { day: string; count: number }) => ({
        name: "Blogs Created",
        value: datum.count
      })
    },
    smooth: true
  };

  return (
    <div>
      <h3 className="text-center mb-4 text-lg">Weekly Blog Chart</h3>
      <Line {...config} />
    </div>
  );
};
