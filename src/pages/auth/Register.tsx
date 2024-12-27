import React from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { RegisterValues } from "../../types";
import { signUpApi } from "../../services";
import { RegisterForm } from "../../components";

export function Register(): React.ReactElement {
  const navigate = useNavigate();

  const handleRegister = async (values: RegisterValues): Promise<void> => {
    try {
      await signUpApi(values);
      navigate("/login");
      message.success("Account created successfully!");
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      }
    }
  };

  return <RegisterForm cb={handleRegister} />;
}
