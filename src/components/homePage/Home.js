import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Flex, Typography, Menu, Input, Card, Avatar, Modal, Col, Button } from "antd";
import { BarChartOutlined, UserOutlined, BlockOutlined, DeliveredProcedureOutlined, ProfileOutlined, HomeOutlined, UsergroupAddOutlined, ApartmentOutlined, SearchOutlined, LogoutOutlined } from "@ant-design/icons";
import clsx from 'clsx';

import styles from './Home.module.scss'
import logo from '../../assets/images/logoPrint.png'
import avatar from '../../assets/images/avatars/avatar-10.png'
import MainContent from './MainContent';

import Dashboard from "../dashboard/Dashboard";
import Inventory from "../inventory/Inventory"
import Delivery from "../delivery/Delivery"
import Projects from "../projects/Projects"
import Employees from "../employees/Employee"
import Customers from "../customers/Customers"
import Department from "../departments/Departments"
import Profile from '../profile/Profile';

const { Title, Text } = Typography
const Home = () => {
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    // get user Information from Localstorage
    const userInfor = JSON.parse(localStorage.getItem('userInfor'))

    useEffect(() => {
        if (userInfor && userInfor.Permission) {
            setRoles(userInfor.Permission)
        }
        navigate('main')
    }, [])

    // Function handle Logout Logic
    const handleLogout = () => {
        if(localStorage.getItem('token')){
            localStorage.removeItem('token')
            localStorage.removeItem('refresh')
            localStorage.removeItem('userInfor')
        }
        navigate('/')
    }

    const menuItem = [
        {
            key: 'dashboard',
            icon: <BarChartOutlined />,
            label: 'Thống kê',
            title: 'Thống kê',
            roles: 'Admin',
        },
        {
            key: 'inventory',
            icon: <BlockOutlined />,
            label: 'Quản lý kho',
            title: 'Quản lý kho',
            roles: 'Manager',
        },
        {
            key: 'delivery',
            icon: <DeliveredProcedureOutlined />,
            label: 'Quản lý giao hàng',
            title: 'Quản lý giao hàng',
            roles: 'Deliver',
        },
        {
            key: 'projects',
            icon: <ProfileOutlined />,
            label: 'Quản lý dự án',
            title: 'Quản lý dự án',
            roles: 'Employee',
        },
        {
            key: 'main',
            icon: <HomeOutlined />,
            label: 'Trang chủ',
            title: 'Trang chủ',
            roles: 'Employee',
        },
        {
            key: 'employees',
            icon: <UsergroupAddOutlined />,
            label: 'Quản lý nhân viên',
            title: 'Quản lý nhân viên',
            roles: 'Manager',
        },
        {
            key: 'customers',
            icon: <UserOutlined />,
            label: 'Quản lý khách hàng',
            title: 'Quản lý khách hàng',
            roles: 'Admin',
        },
        {
            key: 'departments',
            icon: <ApartmentOutlined />,
            label: 'Quản lý phòng ban',
            title: 'Quản lý phòng ban',
            roles: 'Admin',
        }
    ]
    const items = menuItem.filter((item) => {
        return roles.includes(item.roles)
    })


    return (
        <>
            <Col vertical className={styles.sidebar} wrap>
                <Flex xs={24} align="center" justify='center' wrap>
                    <img src={logo}></img>
                    <Text className={styles.logoText}>InkMastery</Text>
                </Flex>

                <Menu
                    mode='inline'
                    defaultSelectedKeys={['main']}
                    className={styles.sidebarMenu}
                >
                    {items.map(item => (
                        <Menu.Item key={item.key} icon={item.icon} onClick={() => navigate(item.key)}>
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>

                <Flex>
                    <Button size='large'
                        className={clsx('submitBtn', styles.logoutBtn)}
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                    >
                        Đăng xuất
                    </Button>
                </Flex>

            </Col>
            <Flex justify='space-around' className={styles.contentContainer}>
                <Flex vertical className={styles.content}>
                    <Flex gap='small' className={styles.header} align='center'>
                        <Input className={styles.search} size='large' placeholder='Search' prefix={<SearchOutlined />} />
                        <Link to='profile'>
                            <img src={avatar}
                                className={styles.avatar}
                            />
                        </Link>
                    </Flex>

                    <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="inventory" element={<Inventory />} />
                        <Route path="delivery" element={<Delivery />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="main" element={<MainContent />} />
                        <Route path="employees" element={<Employees />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="departments" element={<Department />} />
                        <Route path="profile" element={<Profile userInfor={userInfor} />} />
                    </Routes>
                </Flex>
            </Flex>
        </>
    )
}

export default Home;