import React, { } from 'react';
import logo from '../../assets/logo.png';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  UploadOutlined,
  PieChartOutlined,
  HomeOutlined,
  DollarOutlined
} from '@ant-design/icons';


const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const items = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: 'upload-data',
      icon: <UploadOutlined />,
      label: <Link to="/upload-data">Cargar datos</Link>,
    },
    {
      key: 'crm',
      icon: <PieChartOutlined />,
      label: 'CRM',
      children: [
/*         { key: 'crm-1', label: <Link to="/admin-crm?id=1&user_id=1">Tipificación Llamada</Link>, },
        { key: 'crm-2', label: <Link to="/admin-crm?id=2&user_id=1">Canales de Venta</Link> }, */
        { key: 'crm-3', label: <Link to="/admin-crm?id=3&user_id=1">OKR</Link> },
/*         { key: 'crm-4', label: <Link to="/admin-crm?id=4&user_id=1">Gestion de Oportunidades</Link> },
        { key: 'crm-5', label: <Link to="/admin-crm?id=5&user_id=1">Personalizado</Link> }, */
      ],
    },
    {
      key: 'group-sales-volaris?user_id=1',
      icon: <DollarOutlined />,
      label: <Link to="/group-sales-volaris">Venta grupos volaris</Link>,
    },
  ];
  return (
    <>
      <div className="flex items-center justify-center py-3 sticky top-0">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        {!collapsed && (
          <span className="ml-2 text-blue-500 font-bold text-[15px]">HappyTours</span>
        )}
      </div>
      <Menu theme="light" defaultSelectedKeys={[id]} mode="inline" items={items} className='sticky top-15' />
    </>
  );
};

export default Sidebar;