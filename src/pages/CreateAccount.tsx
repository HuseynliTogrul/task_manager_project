import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
  MailOutlined
} from "@ant-design/icons";

import { Button, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateAccount(): React.ReactElement {
  const [newUserName, setNewUserName] = useState("");
  const [newUserFullName, setNewFullName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const navigate = useNavigate();

  const handleNewAccount = () => {
    if (
      newUserName.trim() === "" ||
      newUserFullName.trim() === "" ||
      newPassword.trim() === ""
    ) {
      message.error("It cannot be empty!");
      return;
    }

    if (
      newUserName.length < 4 &&
      newPassword.length < 4 &&
      newUserFullName.length < 4
    ) {
      message.error("Length must be at least 4 characters long!");
      return;
    }

    if (newPassword !== repeatPassword) {
      message.error("The passwords are not the same!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[newUserName.trim()]) {
      message.error("This username already exists!");
      setNewUserName("");
      setNewFullName("");
      setNewPassword("");
    } else {
      users[newUserName.trim()] = {
        fullName: newUserFullName.trim(),
        password: newPassword.trim()
      };
      localStorage.setItem("users", JSON.stringify(users));
      message.success("Account created successfully!");
      navigate("/login");
    }
  };

  return (
    <div className="w-[1200px] max-xl:w-full max-sm:px-5 max-sm:mt-6 max-sm:h-full h-screen my-0 mx-auto flex justify-center items-center">
      <div className="w-[400px] max-sm:w-full bg-[rgba(255,255,255,0.13)] max-sm:bg-white max-sm:pb-10 shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] rounded-xl pt-[15px] pb-[60px] px-[30px] relative bg-[rgba(255,255,255,0.13)">
        <div className="max-sm:hidden">
          <div className="w-[150px] h-[150px] absolute top-[-75px] left-[-75px] rounded-full bg-[linear-gradient(#5c6bc0,#7986cb)] z-[-1]"></div>
          <div className="w-[150px] h-[150px] absolute bottom-[-75px] right-[-75px] rounded-full z-[-1] bg-[linear-gradient(#ec5f64,#ee6e73)]"></div>
        </div>
        <h1 className="text-center text-3xl m-5">Create Account</h1>
        <div className="inputUser">
          <p>Username</p>
          <Input
            className="mb-3 mt-2 p-[15px] rounded shadow-[rgba(0,0,0,0.35)_0px_5px_15px]"
            size="large"
            placeholder="User Name"
            prefix={<UserOutlined />}
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
        </div>
        <div className="inputFullName">
          <p>FullName</p>
          <Input
            className="mb-3 mt-2 p-[15px] rounded shadow-[rgba(0,0,0,0.35)_0px_5px_15px]"
            size="large"
            placeholder="Fullname"
            prefix={<MailOutlined />}
            value={newUserFullName}
            onChange={(e) => setNewFullName(e.target.value)}
          />
        </div>
        <div className="inputPasw">
          <p>Password</p>
          <Input.Password
            className="mb-3 p-[15px] mt-1 rounded shadow-[rgba(0,0,0,0.35)_0px_5px_15px]"
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            prefix={<LockOutlined />}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="inputRepeatPasw">
          <p>Repeat Password</p>
          <Input.Password
            className="p-[15px] mt-1 rounded shadow-[rgba(0,0,0,0.35)_0px_5px_15px]"
            placeholder="Repeat Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            prefix={<LockOutlined />}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <Button
          type="primary"
          className="w-full text-[18px] bg-[#26a69a] py-[20px] hover:!bg-[#1a8e82] mt-[25px]"
          onClick={handleNewAccount}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
}
