import React from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services";
import { RegisterForm } from "../components/RegisterForm";
import { message } from "antd";
import type { RegisterValues } from "../types";

export function Register(): React.ReactElement {
  const navigate = useNavigate();

  const registerHandler = async (values: RegisterValues): Promise<void> => {
    try {
      await signUp(values);
      navigate("/login");
      message.success("Account created successfully!");
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      }
    }
  };

  return <RegisterForm cb={registerHandler} />;
}
