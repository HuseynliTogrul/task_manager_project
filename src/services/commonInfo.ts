import { axiosInstanceApi } from "../api";
import { displayApiError } from "../utils";

const axiosInstance = axiosInstanceApi();

export async function commonInfoApi() {
  try {
    const res = await axiosInstance.get("/blogs");
    return res.data;
  } catch {
    displayApiError(new Error("Failed to fetch data"))
  }
}
