import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined
} from "@ant-design/icons";

import { Input, Button, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Login(): React.ReactElement {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[userName] && users[userName].password === password) {
      localStorage.setItem("currentUser", userName);
      message.success("Login successful!");
      navigate("/");
    } else {
      message.error("Wrong username or password!");
      setUserName("");
      setPassword("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="w-[1200px] max-xl:w-full max-sm:px-5 max-sm:mt-6 max-sm:h-full h-[87vh] my-0 mx-auto flex justify-center items-center">
      <div className="w-[400px] max-sm:w-full bg-[rgba(255,255,255,0.13)] max-sm:bg-white max-sm:pb-10 shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] rounded-xl pt-[15px] pb-[50px] px-[30px] relative bg-[rgba(255,255,255,0.13)">
        <div className="max-sm:hidden">
          <div className="w-[150px] h-[150px] absolute top-[-75px] left-[-75px] rounded-full bg-[linear-gradient(#5c6bc0,#7986cb)] z-[-1]"></div>
          <div className="w-[150px] h-[150px] absolute bottom-[-75px] right-[-75px] rounded-full z-[-1] bg-[linear-gradient(#ec5f64,#ee6e73)]"></div>
        </div>
        <h1 className="text-center text-3xl m-5">Login</h1>
        <div className="inputUser">
          <p>Username</p>
          <Input
            className="mb-3 mt-2 p-[15px] rounded shadow-[rgba(0,0,0,0.35)_0px_5px_15px]"
            size="large"
            placeholder="User Name"
            prefix={<UserOutlined />}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={handleKeyDown}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <Button
          type="primary"
          className="w-full text-[18px] bg-[#26a69a] py-[20px] hover:!bg-[#1a8e82] mt-[25px]"
          onClick={handleLogin}
        >
          Sign in
        </Button>

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
