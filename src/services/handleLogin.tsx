import axios, { AxiosError } from "axios";
import { FormInstance, message } from "antd";
import { NavigateFunction } from "react-router-dom";

export const handleLogin = async (
  values: {
    username: string;
    password: string;
  },
  navigate: NavigateFunction,
  form: FormInstance
) => {
  try {
    const res = await axios.post(
      "https://sample-backend-15ml.onrender.com/api/login",
      {
        username: values.username.trim(),
        password: values.password.trim()
      }
    );
    const data = await res.data;
    localStorage.setItem("currentUser", JSON.stringify(data.name));
    message.success("Login successful!");
    navigate("/");
  } catch (e) {
    if (e instanceof AxiosError) {
      const error = await e.response?.data.message;
      message.error(error.message || "Wrong username or password!");
    }
  }
  form.resetFields();
};