import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Flex, Layout, Typography, Menu, Input, Card, Avatar, Modal } from "antd";
import axios from 'axios';

import logo from '../../assets/images/logoPrint.png'

const { Title, Text } = Typography

const MainContent = () => {
    const [projects, setProjects] = useState([])
    const token = localStorage.getItem('token')
    const instance = axios.create({
        baseURL: 'https://localhost:44389',
        timeout: 5000,
        headers: { 'Authorization': `Bearer ${token}` }
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await instance.get('api/Admin/GetAllProject')
            if (response && response.status === 200) {
                setProjects(response.data)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <Flex wrap gap='large' justify='space-between' style={{ padding: '16px' }}>
                {
                    projects.map((item, index) => {
                        const date = new Date(item.actualEndDate)
                        return (
                            <Card
                                hoverable
                                style={{ width: '30%', backgroundColor: '#2f3349' }}
                                cover={
                                    <img src={logo} />
                                }
                            >
                                <Flex vertical style={{ textAlign: 'left' }}>
                                    <Text style={{ fontSize: '16px' }}>{item.projectName}</Text>
                                    <Text>Yêu cầu KH: {item.description}</Text>
                                    {item.progress === 100 &&
                                        <Text>Ngày hoàn thành: {`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</Text>}
                                </Flex>
                            </Card>
                        )
                    })
                }
                {/* <Card
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
                </Card> */}
            </Flex>
        </>
    )
}

export default MainContent;