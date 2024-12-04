import * as React from "react";
import { Button, Form, Input } from "antd";
import type { RegisterValues } from "../types";
import { UserOutlined, LockOutlined, IdcardOutlined } from "@ant-design/icons";
import { normalizeValues } from "../utils/helper";

interface RegisterProps {
  cb: (values: RegisterValues) => void;
}

export function RegisterForm({ cb }: RegisterProps): React.ReactElement {
  const [form] = Form.useForm();

  React.useEffect(() => {
    return () => form.resetFields();
  }, [form]);

  const onFinish = async (values: RegisterValues) => {
    const normalizedValues = normalizeValues(values);

    try {
      await cb(normalizedValues);
      form.resetFields();
    } catch (error) {
      return error;
    }
  };
  return (
    <div className="w-[1200px] max-xl:w-full max-sm:px-5 max-sm:mt-6 max-sm:h-full h-screen my-0 mx-auto flex justify-center items-center mt-[50px]">
      <div className="w-[400px] max-sm:w-full bg-[rgba(255,255,255,0.13)] max-sm:bg-white max-sm:pb-10 shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] rounded-xl pt-[15px] pb-[60px] px-[30px] relative bg-[rgba(255,255,255,0.13)">
        <div className="max-sm:hidden">
          <div className="w-[150px] h-[150px] absolute top-[-75px] left-[-75px] rounded-full bg-[linear-gradient(#5c6bc0,#7986cb)] z-[-1]"></div>
          <div className="w-[150px] h-[150px] absolute bottom-[-75px] right-[-75px] rounded-full z-[-1] bg-[linear-gradient(#ec5f64,#ee6e73)]"></div>
        </div>
        <h1 className="text-center text-3xl m-5">Create Account</h1>
        <div className="inputUser">
          <Form
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<RegisterValues>
              label="Username"
              className="mb-3 mt-2"
              name="username"
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
            <Form.Item<RegisterValues>
              label="Fullname"
              className="mb-3 mt-2"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your Fullname!"
                }
              ]}
            >
              <Input
                className="p-[15px]"
                prefix={<IdcardOutlined />}
                placeholder="Fullname"
              />
            </Form.Item>
            <Form.Item<RegisterValues>
              label="Password"
              className="mb-3 mt-2"
              name="password"
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
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item<RegisterValues>
              label="Repeat Password"
              name="repeatPassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please input your Repeat Password!"
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value && value.length < 5) {
                      return Promise.reject(
                        new Error("Password must be minimum 5 characters!")
                      );
                    }
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  }
                })
              ]}
            >
              <Input.Password
                className="p-[15px]"
                prefix={<LockOutlined />}
                placeholder="Repeat Password"
              />
            </Form.Item>
            <Button
              type="primary"
              className="w-full text-[18px] bg-[#26a69a] py-[20px] hover:!bg-[#1a8e82]"
              htmlType="submit"
            >
              Sign up
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
