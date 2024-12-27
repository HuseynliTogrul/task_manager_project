import { message } from "antd";
import { AxiosError } from "axios";

export function displayApiError(e: unknown) {
  if (e instanceof AxiosError) {
    const error = e.response?.data.message;
    message.error(error);
  } else if (e instanceof Error) {
    message.error(e.message);
  }
}
