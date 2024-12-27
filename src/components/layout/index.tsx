import React, { useEffect, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import { Layout, Menu } from "antd";
import { menuItems } from "../Home/MenuItem";

const { Sider } = Layout;

interface IProps {
  children?: React.ReactNode;
}

export function AppLayout({ children }: IProps): React.ReactElement {
  const [collapsed, setCollapsed] = useState(false);
  const currentUser = localStorage.getItem("currentUser");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <div>
      {currentUser && (
        <Layout className="h-screen">
          <Sider
            className="mt-[94px] w-screen bg-[cadetblue] h-100 fixed top-0 bottom-0"
            collapsible
            width={220}
            collapsed={collapsed}
            trigger={
              <div className="bg-[rgb(8_104_107)]">
                {collapsed ? <RightOutlined /> : <LeftOutlined />}
              </div>
            }
            onCollapse={(value) => setCollapsed(value)}
          >
            <div className="demo-logo-vertical" />
            <Menu
              className="py-5 bg-[cadetblue]"
              theme="dark"
              defaultSelectedKeys={[pathname]}
              mode="inline"
              items={menuItems}
            />
          </Sider>
          <Layout
            className="h-screen"
            style={{
              marginLeft: collapsed ? 94 : 220,
              transition: "margin-left 0.3s"
            }}
          >
            <Content className="mt-[94px] p-6 pt-[23px] w-full bg-[aliceblue]">
              {children || <Outlet />}
            </Content>
          </Layout>
        </Layout>
      )}
    </div>
  );
}
