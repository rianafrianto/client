import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  FileAddOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <Menu mode="inline" style={{ height: '100%', borderRight: 0 }} selectedKeys={[location.pathname]}>
      <Menu.Item key="/" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/add-card" icon={<FileAddOutlined />}>
        <Link to="/add-card">Add Card</Link>
      </Menu.Item>
      <Menu.Item key="/manage-cards" icon={<AppstoreAddOutlined />}>
        <Link to="/manage-cards">Manage Cards</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
