import { useState } from "react";
import { ChevronDown, LogOutIcon } from "lucide-react";
import { Layout, Button, Avatar } from "antd";
const { Header } = Layout;
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const CustomHeader = ({ collapsed, setCollapsed, colorBgContainer }) => {
  const [open, setOpen] = useState(false);

  // Puedes reemplazar este nombre por una prop o contexto
  const userName = "Admin CDC";

  const getInitials = (name) => {
    const names = name.trim().split(" ");
    const initials =
      names.length >= 2 ? names[0][0] + names[1][0] : names[0].slice(0, 2);
    return initials.toUpperCase();
  };

  const toggleMenu = () => setOpen(!open);
  const handleLogout = () => {
    /* onLogout?.(); */
    setOpen(false);
  };

  return (
    <Header
      className="sticky top-0 z-99"
      style={{ padding: 0, background: colorBgContainer }}
    >
      <div className="bg-white shadow flex justify-between items-center h-16 pl-0 pr-6 relative">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="flex items-center space-x-2 focus:outline-none"
          >
           {/*  <Avatar
              style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
              size="large"
              gap={0}
            >
              {userName}
            </Avatar> */}
             <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              {getInitials(userName)}
            </div>
            <span className="text-gray-700 font-medium hidden sm:inline">{userName}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white  rounded shadow-lg z-50">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600 flex items-center"
                onClick={handleLogout}
              >
                <LogOutIcon className="mx-2 w-5" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </Header>
  );
};

export default CustomHeader;
