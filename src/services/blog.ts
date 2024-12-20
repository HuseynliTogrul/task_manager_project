import type { BlogValues } from "../types";
import { axiosInstanceApi } from "../api/axiosInstanceApi";
import { displayApiError } from "../utils";

const axiosInstance = axiosInstanceApi();

export async function addBlogApi(value: BlogValues) {
  try {
    const res = await axiosInstance.post("/blogs", value);
    return res.data;
  } catch (e) {
    displayApiError(e);
  }
}

export async function deleteBlogApi(key: string) {
  try {
    const res = await axiosInstance.delete(`/blogs/${key}`);
    return res.data;
  } catch (e) {
    displayApiError(e);
  }
}

export async function updateBlogApi(key: string, updatedBlog: BlogValues) {
  try {
    const res = await axiosInstance.put(`/blogs/${key}`, updatedBlog);
    return res.data;
  } catch (e) {
    displayApiError(e);
  }
}
