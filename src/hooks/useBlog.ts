import { useEffect, useState } from "react";
import { message } from "antd";
import { axiosInstanceApi } from "../api";
import type { BlogResponse, BlogValues } from "../types";

export function useBlog(refetch: boolean) {
  const [data, setData] = useState<BlogValues[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const axiosInstance = axiosInstanceApi();
      try {
        const response = await axiosInstance.get("/blogs");
        const blogList = response.data.map((blog: BlogResponse) => ({
          key: blog.id,
          title: blog.title,
          url: blog.url
        }));
        setData(blogList);
      } catch {
        message.error("Failed to fetch blogs");
      }
    };

    fetchBlogs();
  }, [refetch]);

  return { data, setData };
}
