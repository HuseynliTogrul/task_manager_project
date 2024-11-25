import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined
} from "@ant-design/icons";

import type { CheckboxProps } from "antd";
import { Input, Checkbox, Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export function Login(): React.ReactElement {
  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className="w-[1200px] h-screen my-0 mx-auto flex justify-center items-center">
      <div className="w-[400px] shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] rounded pt-[15px] pb-[50px] px-[30px] bg-white relative bg-[rgba(255,255,255,0.13)">
        <div>
          <div className="w-[150px] h-[150px] absolute top-[-75px] left-[-75px] rounded-full bg-[linear-gradient(#5c6bc0,#7986cb)] z-[-1]"></div>
          <div className="w-[150px] h-[150px] absolute bottom-[-75px] right-[-75px] rounded-full z-[-1] linear-gradient(to right,#ec5f64,#ee6e73)"></div>
        </div>
        <h1 className="text-center text-3xl m-5">Login</h1>
        <div className="inputUser">
          <p>Username</p>
          <Input
            className="mb-3 mt-2 p-[15px] rounded shadow-[rgba(0,0,0,0.35)_0px_5px_15px]"
            size="large"
            placeholder="User Name"
            prefix={<UserOutlined />}
          />
        </div>
        <div className="inputPasw">
          <p>Password</p>
          <Input.Password
            className="p-[15px] mt-1 rounded shadow-[rgba(0,0,0,0.35)_0px_5px_15px]"
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            prefix={<LockOutlined />}
          />
        </div>
        <div className="flex justify-between items-center mt-3.5 mb-5">
          <Checkbox
            onChange={onChange}
            className="text-gray-500"
          >
            Remember me
          </Checkbox>
          <p className="underline cursor-pointer text-[#e65100] text-[13px]">
            Forget Me?
          </p>
        </div>
        <Button
          type="primary"
          className="w-full text-[18px] bg-[#26a69a] py-[20px] hover:bg-[#1a8e82]"
        >
          Login
        </Button>
        <div className="flex justify-between my-5">
          <Link
            to="https://google.com"
            className="bg-[#4285F4] rounded-[3px] py-[6px] px-[35px] text-white"
          >
            Google
          </Link>
          <Link
            to="https://facebook.com"
            className="bg-[#3b5998] rounded-[3px] py-[6px] px-[35px] text-white"
          >
            Facebook
          </Link>
        </div>
        <Link
          to="/createAccount"
          className="text-[#e65100] underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
