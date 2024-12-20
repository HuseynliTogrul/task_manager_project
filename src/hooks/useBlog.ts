import { useEffect, useState } from "react";
import type { BlogResponse, BlogValues } from "../types";
import { axiosInstanceApi } from "../api/axiosInstanceApi";

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
      } catch (error) {
        return error;
      }
    };

    fetchBlogs();
  }, [refetch]);

  return { data };
}

