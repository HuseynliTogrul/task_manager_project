import { Link } from "react-router-dom";
import {
  UserOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  FieldTimeOutlined,
  CalendarOutlined,
  ProfileOutlined
} from "@ant-design/icons";
import { MenuProps } from "rc-menu";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}

export const menuItems: MenuItem[] = [
  getItem(<Link to="/">Dashboard</Link>, "/", <HomeOutlined />),
  getItem(<Link to="/users">Users</Link>, "/users", <UserOutlined />),
  getItem(<Link to="/blogs">Blogs</Link>, "/blogs", <ProfileOutlined />),
  getItem(<Link to="/tasks">Tasks</Link>, "/tasks", <UnorderedListOutlined />),
  getItem(
    <Link to="/time-tracking">Time tracking</Link>,
    "/time-tracking",
    <FieldTimeOutlined />
  ),
  getItem(
    <Link to="/my-calendar">My Calendar</Link>,
    "/my-calendar",
    <CalendarOutlined />
  )
];
