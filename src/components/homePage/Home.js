import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Flex, Layout, Typography, Menu, Input, Card, Avatar, Modal } from "antd";
import { BarChartOutlined, UserOutlined, BlockOutlined, DeliveredProcedureOutlined, ProfileOutlined, HomeOutlined, UsergroupAddOutlined, ApartmentOutlined, SearchOutlined } from "@ant-design/icons";

import styles from './Home.module.scss'
import logo from '../../assets/images/logoPrint.png'
import avatar from '../../assets/images/avatars/avatar-10.png'
import MainContent from './MainContent';
import Profile from '../profile/Profile';

const { Title, Text } = Typography
const Home = () => {

    return (
        <>
            <Flex vertical className={styles.sidebar}>
                <Flex align="center" justify='center'>
                    <img src={logo}></img>
                    <Text className={styles.logoText}>InkMastery</Text>
                </Flex>

                <Menu
                    mode='inline'
                    defaultSelectedKeys={['1']}
                    className={styles.sidebarMenu}
                    items={[
                        {
                            key: '1',
                            icon: <BarChartOutlined />,
                            label: 'Thống kê',
                        },
                        {
                            key: '2',
                            icon: <BlockOutlined />,
                            label: 'Quản lý kho',
                        },
                        {
                            key: '3',
                            icon: <DeliveredProcedureOutlined />,
                            label: 'Quản lý giao hàng',
                        },
                        {
                            key: '4',
                            icon: <ProfileOutlined />,
                            label: 'Quản lý dự án',
                        },
                        {
                            key: '5',
                            icon: <HomeOutlined />,
                            label: 'Trang chủ',
                        },
                        {
                            key: '6',
                            icon: <UsergroupAddOutlined />,
                            label: 'Quản lý nhân viên',
                        },
                        {
                            key: '7',
                            icon: <UserOutlined />,
                            label: 'Quản lý khách hàng',
                        },
                        {
                            key: '8',
                            icon: <ApartmentOutlined />,
                            label: 'Quản lý phòng ban',
                        },
                    ]}>
                </Menu>
            </Flex>
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
                    <Profile />
                    {/* <Routes>
                        <Route path='/home' element={<MainContent />}></Route>
                    </Routes> */}
                </Flex>
            </Flex>
        </>
    )
}

export default Home;