import { FormInstance, message } from "antd";
import axios, { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

export const handleNewAccount = async (
  values: {
    userName: string;
    userFullName: string;
    password: string;
    repeatPassword: string;
  },
  navigate: NavigateFunction,
  form: FormInstance
) => {
  // if (
  //   values.userName.trim() === "" ||
  //   values.userFullName.trim() === "" ||
  //   values.password.trim() === "" ||
  //   values.repeatPassword.trim() === ""
  // ) {
  //   message.error("Fields cannot be empty!");
  //   return;
  // }

  // if (
  //   values.userName.length < 4 ||
  //   values.userFullName.length < 4 ||
  //   values.password.length < 4
  // ) {
  //   message.error("Each field must be at least 4 characters long!");
  //   return;
  // }

  // if (values.password !== values.repeatPassword) {
  //   message.error("Passwords do not match!");
  //   return;
  // }
  // Post
  try {
    const resPost = await axios.post(
      "https://sample-backend-15ml.onrender.com/api/users",
      {
        username: values.userName.trim(),
        password: values.userFullName.trim(),
        fullname: values.password.trim()
      }
    );
    if (resPost.status === 200) {
      message.success("Account created successfully!");
      navigate("/login");
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      const error = e.response?.data.message;
      message.error(error || "This username already exists!");
    }
  }

  // Get
  try {
    const resGet = await axios.get(
      `https://sample-backend-15ml.onrender.com/api/users`
    );

    if (resGet.status === 200) {
      const users = resGet.data;
      console.log(`users: ${users}`);
      message.success("Account created successfully!");
      navigate("/login");
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      const error = e.response?.data.message;
      message.error(error || "GET failed!");
    }
  }

  form.resetFields();
};