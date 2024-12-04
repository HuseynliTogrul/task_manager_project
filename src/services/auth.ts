import { LoginValues, RegisterValues } from "./../types";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import { RegisterResponse, LoginResponse } from "../types/api";

export async function login(values: LoginValues): Promise<LoginResponse> {
  try {
    const res = await axios.post(
      "https://sample-backend-15ml.onrender.com/api/login",
      values
    );
    return res.data as LoginResponse;
  } catch (e) {
    if (e instanceof AxiosError) {
      const error = e.response?.data?.message;
      message.error(error);
    } else {
      message.error("An unexpected error occurred.");
    }
    throw new Error("Login failed");
  }
}

export async function signUp(values: RegisterValues): Promise<RegisterResponse> {
  try {
    const res = await axios.post(
      "https://sample-backend-15ml.onrender.com/api/users",
      values
    );
    return res.data as RegisterResponse;
  } catch (e) {
    if (e instanceof AxiosError) {
      const error = e.response?.data.message;
      message.error(error);
    }
    throw new Error("Account creation failed");
  }
}
