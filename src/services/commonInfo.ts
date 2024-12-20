import { axiosInstanceApi } from "../api/axiosInstanceApi";

const axiosInstance = axiosInstanceApi();

export async function commonInfoApi() {
  try {
    const res = await axiosInstance.get("/blogs");
    return res.data;
  } catch (error) {
    return error;
  }
}
