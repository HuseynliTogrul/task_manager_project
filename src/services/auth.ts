import axios from "axios";
import {
  RegisterResponse,
  LoginResponse,
  LoginValues,
  RegisterValues
} from "../types";
import { displayApiError } from "../utils";

export async function loginApi(values: LoginValues): Promise<LoginResponse> {
  try {
    const res = await axios.post(
      "https://sample-backend-15ml.onrender.com/api/login",
      values
    );
    return res.data as LoginResponse;
  } catch (e) {
    displayApiError(e);
    throw new Error("Login failed");
  }
}

export async function signUpApi(
  values: RegisterValues
): Promise<RegisterResponse | undefined> {
  try {
    const res = await axios.post(
      "https://sample-backend-15ml.onrender.com/api/users",
      values
    );
    return res.data as RegisterResponse;
  } catch (e) {
    displayApiError(e);
  }
}
