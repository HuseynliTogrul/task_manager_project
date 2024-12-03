import { LoginValues, AccountValues } from "./../types";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import { AccountProps, LoginProps } from "../types/api";

export async function login(values: LoginValues): Promise<LoginProps> {
  try {
    const res = await axios.post(
      "https://sample-backend-15ml.onrender.com/api/login",
      values
    );
    const data = res.data;
    localStorage.setItem("currentUser", JSON.stringify(data.token));
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      const error = e.response?.data?.message;
      message.error(error);
    } else {
      message.error("An unexpected error occurred.");
    }
    throw new Error("Wrong username or password!");
  }
}

export async function signUp(values: AccountValues): Promise<AccountProps> {
  try {
    const res = await axios.post(
      "https://sample-backend-15ml.onrender.com/api/users",
      values
    );
    const data = res.data;
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      const error = e.response?.data.message;
      message.error(error);
    }
    throw new Error("Account creation failed");
  }
}
