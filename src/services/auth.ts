import { LoginValues, AccountValues } from "./../types/auth";
import axios, { AxiosError } from "axios";
import { message } from "antd";

export async function login(values: LoginValues): Promise<void> {
  try {
    const res = await axios.post(
      "https://sample-backend-15ml.onrender.com/api/login",
      values
    );
    const data = res.data;
    localStorage.setItem("currentUser", JSON.stringify(data.name));
    message.success("Login successful!");
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

export async function signUp(values: AccountValues): Promise<void> {
  try {
    await axios.post(
      "https://sample-backend-15ml.onrender.com/api/users",
      values
    );
    message.success("Account created successfully!");
  } catch (e) {
    if (e instanceof AxiosError) {
      const error = e.response?.data.message;
      message.error(error);
    }
    throw new Error("Account creation failed");
  }
}
