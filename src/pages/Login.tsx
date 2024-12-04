import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services";
import { LoginForm } from "../components";
import { message } from "antd";
import type { LoginValues } from "../types";

export function Login(): React.ReactElement {
  const navigate = useNavigate();

  const loginHandler = async (values: LoginValues): Promise<void> => {
    try {
      const data = await login(values);
      if (data) {
        localStorage.setItem("currentUser", JSON.stringify(data?.token));
        navigate("/");
        message.success("Login successful!");
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      }
    }
  };

  return <LoginForm cb={loginHandler} />;
}
