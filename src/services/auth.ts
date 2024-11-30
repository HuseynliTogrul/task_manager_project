import axios, { AxiosError } from "axios";
import { FormInstance, message } from "antd";
import { NavigateFunction } from "react-router-dom";
import { HandleNewAccountParams } from "../types/types";

export async function login(
  values: {
    username: string;
    password: string;
  },
  navigate: NavigateFunction,
  form: FormInstance
) {
  try {
    const res = await axios.post(
      "https://sample-backend-15ml.onrender.com/api/login",
      {
        username: values.username.trim(),
        password: values.password.trim()
      }
    );
    const data = res.data;
    localStorage.setItem("currentUser", JSON.stringify(data.name));
    message.success("Login successful!");
    navigate("/");
  } catch (e) {
    if (e instanceof AxiosError) {
      const error = e.response?.data?.message;
      message.error(error || "Wrong username or password!");
    } else {
      message.error("An unexpected error occurred.");
    }
  }
  form.resetFields();
}

export async function signUp({
  values,
  navigate,
  form
}: HandleNewAccountParams) {
  try {
    await axios.post(
      "https://sample-backend-15ml.onrender.com/api/users",
      values
    );
    message.success("Account created successfully!");
    navigate("/login");
    form.resetFields();
  } catch (e) {
    if (e instanceof AxiosError) {
      const error = e.response?.data.message;
      message.error(error);
    }
  }
}
