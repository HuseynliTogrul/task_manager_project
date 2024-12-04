import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";

export function Home(): React.ReactElement {
  const currentUser = localStorage.getItem("currentUser");
  const [isCloseMenu, setIsCloseMenu] = useState(false);
  const toggleMenu = () => {
    setIsCloseMenu(!isCloseMenu);
  };

  return (
    <div>
      {!currentUser ? (
        <h1 className="p-5 text-center mt-[90px]">Home</h1>
      ) : (
        <div className="flex">
          <div
            className={`${
              isCloseMenu ? "w-[100px]" : "w-[300px]"
            } h-[87vh] bg-[cadetblue] fixed left-0 top-[95px] z-20 shadow-[rgba(0,0,0,0.56)_0px_22px_70px_4px] flex flex-col  justify-between transition-all duration-100 z`}
          >
            <div className="p-5 my-0 mx-auto">
              <li className="flex gap-2 items-center">
                <span>1</span>
                <p className={`${isCloseMenu ? "hidden" : "block"}`}>salam</p>
              </li>
              <li className="flex gap-2 items-center">
                <span>2</span>
                <p className={`${isCloseMenu ? "hidden" : "block"}`}>salam</p>
              </li>
              <li className="flex gap-2 items-center">
                <span>3</span>
                <p className={`${isCloseMenu ? "hidden" : "block"}`}>salam</p>
              </li>
            </div>
            <div
              className="text-center bg-[#006164] text-white p-[15px] cursor-pointer w-full"
              onClick={toggleMenu}
            >
              {isCloseMenu ? <RightOutlined /> : <LeftOutlined />}
            </div>
          </div>
          <div className="ml-[300px] p-5 mt-[95px]">
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
          </div>
        </div>
      )}
    </div>
  );
}
