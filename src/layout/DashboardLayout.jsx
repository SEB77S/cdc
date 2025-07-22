import React, { useEffect, useState } from 'react';
import { Layout, theme, Typography, Button } from 'antd';
const { Text } = Typography;
import Sidebar from '../components/sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import CustomHeader from '../components/header/Header';
import CustomFooter from '../components/footer/Footer';
import { Outlet } from 'react-router-dom';
import './DashboardLayout.css'
const { Sider, Content, Header } = Layout;
import useAppStore from '../store/useAppStore';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

const DashboardLayout = () => {
  const isCollapsed = useAppStore((s) => s.isSidebarCollapsed);
  const setModule = useAppStore((s) => s.setModule);
  const module = useAppStore((s) => s.module);

  const location = useLocation();
  const [collapsed, setCollapsed] = useState(isCollapsed);
  const getTitleFromPath = (pathname) => {
    if (pathname === '/') return 'Home';
    if (pathname.startsWith('/upload-data')) return 'Cargar Datos';
    if (pathname.startsWith('/admin-crm')) return 'CRM';
    if (pathname.startsWith('/group-sales-volaris')) return 'Venta grupos volaris';
    return 'Módulo';
  };

  useEffect(() => {
    const currentTitle = getTitleFromPath(location.pathname);
    setModule(currentTitle);
  }, [location.pathname, setModule]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
        style={{ background: '#fff' }}
        className='shadow'
      >
        <Sidebar className='relative' collapsed={collapsed} />
      </Sider>

      <Layout>
        <CustomHeader colorBgContainer={colorBgContainer} collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content style={{ margin: '0 16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} /> */}
          <div className='my-2'>
            <Text className='my-4' type="secondary">{module}</Text>
          </div>
          <Content style={{ overflow: 'auto' }}>
            <Outlet />
          </Content>
        </Content>
        <CustomFooter />
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
