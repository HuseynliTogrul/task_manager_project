import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services";
import { LoginForm } from "../components";
import { message } from "antd";
import type { LoginValues } from "../types";

export function Login(): React.ReactElement {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      navigate("/");
    }
  }, [navigate]);

  const loginHandler = async (values: LoginValues): Promise<void> => {
    try {
      const data = await loginApi(values);
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
