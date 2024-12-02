import { FormInstance } from "antd";
import { NavigateFunction } from "react-router-dom";

export interface LoginValues {
  username: string;
  password: string;
}

export interface HandleLoginParams{
  values:LoginValues;
  navigate:NavigateFunction;
  form:FormInstance;
}

export interface AccountValues {
  username: string;
  password: string;
  name: string;
  repeatPassword: string;
}

export interface HandleNewAccountParams {
  values: AccountValues;
  navigate: NavigateFunction;
  form: FormInstance;
}
