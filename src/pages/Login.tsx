import React from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Button, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth";

export function Login(): React.ReactElement {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: { username: string; password: string }) => {
    login(values, navigate, form);
  };

  return (
    <div className="w-[1200px] max-xl:w-full max-sm:px-5 max-sm:mt-6 max-sm:h-full h-[87vh] my-0 mx-auto flex justify-center items-center">
      <div className="w-[400px] max-sm:w-full bg-[rgba(255,255,255,0.13)] max-sm:bg-white max-sm:pb-10 shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] rounded-xl pt-[15px] pb-[50px] px-[30px] relative">
        <div className="max-sm:hidden">
          <div className="w-[150px] h-[150px] absolute top-[-75px] left-[-75px] rounded-full bg-[linear-gradient(#5c6bc0,#7986cb)] z-[-1]"></div>
          <div className="w-[150px] h-[150px] absolute bottom-[-75px] right-[-75px] rounded-full z-[-1] bg-[linear-gradient(#ec5f64,#ee6e73)]"></div>
        </div>
        <h1 className="text-center text-3xl m-5">Login</h1>
        <div className="inputUser">
          <Form
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"
              className="mb-3 mt-2 !flex !flex-col"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!"
                }
              ]}
            >
              <Input
                className="p-[15px]"
                prefix={<UserOutlined />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              className="mb-0 mt-2"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!"
                },
                { min: 5, message: "Password must be minimum 5 characters!" }
              ]}
            >
              <Input.Password
                className="p-[15px]"
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Button
              type="primary"
              className="w-full text-[18px] bg-[#26a69a] py-[20px] hover:!bg-[#1a8e82] mt-[25px]"
              htmlType="submit"
            >
              Sign in
            </Button>
          </Form>
        </div>
        <div className="text-center mt-4">
          <span className="text-gray-500 mr-2">Don't have an account?</span>
          <Link
            to="/create-account"
            className="text-[#e65100] underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
