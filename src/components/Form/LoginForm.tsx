import * as React from "react";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { normalizeValues } from "../../utils";
import { LoginValues } from "../../types";

interface LoginProps {
  cb: (values: LoginValues) => Promise<void>;
}

export function LoginForm({ cb }: LoginProps): React.ReactElement {
  const [form] = Form.useForm();

  React.useEffect(() => {
    return () => form.resetFields();
  }, [form]);

  const onFinish = async (values: LoginValues) => {
    const normalizedValues = normalizeValues(values);

    try {
      await cb(normalizedValues);
      form.resetFields();
    } catch {
      message.error("Invalid Username or Password!");
    }
  };

  return (
    <div className="w-[1200px] max-xl:w-full max-sm:px-5 h-[82vh] mt-[100px] mb-0 mx-auto flex justify-center items-center">
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
            <Form.Item<LoginValues>
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
            <Form.Item<LoginValues>
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
        <div className="text-center mt-4 max-sm:text-[14px]">
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
