import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const CustomFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      HappyTours ©{new Date().getFullYear()}
    </Footer>
  );
};

export default CustomFooter;