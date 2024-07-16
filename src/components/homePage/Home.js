import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Flex, Typography, Menu, Input, Card, Avatar, Modal, Col } from "antd";
import { BarChartOutlined, UserOutlined, BlockOutlined, DeliveredProcedureOutlined, ProfileOutlined, HomeOutlined, UsergroupAddOutlined, ApartmentOutlined, SearchOutlined, LogoutOutlined } from "@ant-design/icons";

import styles from './Home.module.scss'
import logo from '../../assets/images/logoPrint.png'
import avatar from '../../assets/images/avatars/avatar-10.png'
import MainContent from './MainContent';
import Profile from '../profile/Profile';
import ChangePass from '../profile/ChangePass';

const { Title, Text } = Typography
const Home = () => {
    const [roles, setRoles] = useState([]);
    const userInfor = JSON.parse(localStorage.getItem('userInfor'))

    useEffect(() => {       
        if(userInfor && userInfor.Permission){
            setRoles(userInfor.Permission)
        }
    },[])
    console.log(roles)

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
            roles: 'Leader',
        },
        {
            key: 'home',
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
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Đăng xuất',
            title: 'Đăng xuất',   
            roles: 'Employee',                         
        },
    ]

    const items = menuItem.filter((item) => {
        console.log(roles.includes(item.roles))
        return roles.includes(item.roles)
    })
    console.log(items)

    return (
        <>
            <Col vertical className={styles.sidebar} wrap>
                <Flex xs={24} align="center" justify='center'wrap>
                    <img src={logo}></img>
                    <Text className={styles.logoText}>InkMastery</Text>
                </Flex>

                <Menu
                mode='inline'
                defaultSelectedKeys={['1']}
                className={styles.sidebarMenu}
                items = {items}
                 />
            </Col>
            <Flex justify='space-around' className={styles.contentContainer}>
                <Flex vertical className={styles.content}>
                    <Flex gap='small' className={styles.header} align='center'>
                        <Input className={styles.search} size='large' placeholder='Search' prefix={<SearchOutlined />} />
                        <Link to = './profile'>
                            <img src={avatar}
                                className={styles.avatar}
                            />
                        </Link>
                    </Flex>
                    
                    {/* <MainContent /> */}
                    <Profile userInfor={userInfor}/>                   

                    {/* <Routes>
                        <Route path='/home' element={<MainContent />}></Route>
                    </Routes> */}
                </Flex>
            </Flex>
        </>
    )
}

export default Home;