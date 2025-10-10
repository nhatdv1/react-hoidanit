import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link
} from "react-router-dom";
import UserPage from './screens/user.page.js';

import { UserOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import './App.scss'

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: <Link to='/'> Home</Link >,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to='/users'> Manager Users</Link >,
    key: 'users',
    icon: <UserOutlined />,
  }
];

const Header = () => {
  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items} />
  );
};


const LayoutAdmin = () => {

  const getData = async () => {
    const res = await fetch('http://localhost:8000/api/v1/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "admin@gmail.com", password: "123456" })
    })

    const dataLogin = await res.json();
    if (dataLogin?.data?.access_token) {
      localStorage.setItem("access_token", dataLogin?.data?.access_token)
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      getData();
    }

  }, [])

  return (
    <div>
      <Header />
      <Outlet />
    </div>

  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <App /> },
      {
        path: "users",
        element: <UserPage />,
      }
    ]
  }

]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
