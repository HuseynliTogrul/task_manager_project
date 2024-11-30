import { FormInstance } from "antd";
import { NavigateFunction } from "react-router-dom";

export interface AccountValues {
  username: string;
  name: string;
  password: string;
  repeatPassword: string;
}

export interface HandleNewAccountParams {
  values: AccountValues;
  navigate: NavigateFunction;
  form: FormInstance;
}
