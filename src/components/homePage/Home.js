import { useState } from 'react'
import { Flex, Layout, Typography, Menu, Input, Card } from "antd";
import { BarChartOutlined, UserOutlined, BlockOutlined, DeliveredProcedureOutlined, ProfileOutlined, HomeOutlined, UsergroupAddOutlined, ApartmentOutlined, SearchOutlined } from "@ant-design/icons";

import styles from './Home.module.scss'
import logo from '../../assets/images/logoPrint.png'

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
                    <Flex className={styles.header} align='center'>
                        <Input className={styles.search} size='large' placeholder='Search' prefix={<SearchOutlined />} />
                    </Flex>
                    <Flex wrap gap='large' justify='space-between' style={{ padding: '16px' }}>
                        <Card
                            hoverable
                            style={{ width: '30%', backgroundColor: '#2f3349' }}
                            cover={
                                <img src={logo} />
                            }
                        >
                            <Flex vertical>
                                <Title level={3}>In Thiệp cưới</Title>
                                <Text>Write descritption here. something more about this object</Text>
                            </Flex>
                        </Card>
                        <Card
                            hoverable
                            style={{ width: '30%', backgroundColor: '#2f3349' }}
                            cover={
                                <img src={logo} />
                            }
                        >
                            <Flex vertical>
                                <Title level={3}>In Thiệp cưới</Title>
                                <Text>Write descritption here. something more about this object</Text>
                            </Flex>
                        </Card>
                        <Card
                            hoverable
                            style={{ width: '30%', backgroundColor: '#2f3349' }}
                            cover={
                                <img src={logo} />
                            }
                        >
                            <Flex vertical>
                                <Title level={3}>In Thiệp cưới</Title>
                                <Text>Write descritption here. something more about this object</Text>
                            </Flex>
                        </Card>
                        <Card
                            hoverable
                            style={{ width: '30%', backgroundColor: '#2f3349' }}
                            cover={
                                <img src={logo} />
                            }
                        >
                            <Flex vertical>
                                <Title level={3}>In Thiệp cưới</Title>
                                <Text>Write descritption here. something more about this object</Text>
                            </Flex>
                        </Card>
                        <Card
                            hoverable
                            style={{ width: '30%', backgroundColor: '#2f3349' }}
                            cover={
                                <img src={logo} />
                            }
                        >
                            <Flex vertical>
                                <Title level={3}>In Thiệp cưới</Title>
                                <Text>Write descritption here. something more about this object</Text>
                            </Flex>
                        </Card>
                        <Card
                            hoverable
                            style={{ width: '30%', backgroundColor: '#2f3349' }}
                            cover={
                                <img src={logo} />
                            }
                        >
                            <Flex vertical>
                                <Title level={3}>In Thiệp cưới</Title>
                                <Text>Write descritption here. something more about this object</Text>
                            </Flex>
                        </Card>
                        <Card
                            hoverable
                            style={{ width: '30%', backgroundColor: '#2f3349' }}
                            cover={
                                <img src={logo} />
                            }
                        >
                            <Flex vertical>
                                <Title level={3}>In Thiệp cưới</Title>
                                <Text>Write descritption here. something more about this object</Text>
                            </Flex>
                        </Card>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default Home;