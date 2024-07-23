import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Flex, Layout,Col, Typography, Menu, Input, Card, Avatar, Modal } from "antd";
import axios from 'axios';

import logo from '../../assets/images/logoPrint.png'

const { Title, Text, Paragraph } = Typography

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
            <Flex wrap gap='large' justify='flex-start' style={{ padding: '16px' }}>
                {
                    projects.map((item, index) => {
                        const date = new Date(item.actualEndDate)
                        return (
                            <Col key={index} xs={24} sm={11} md={7} xl={5}>
                                <Card
                                    hoverable
                                    style={{ backgroundColor: '#2f3349' }}
                                    cover={
                                        <Flex style={{ padding: '4px' }}>
                                            <div style={{
                                                justifySelf: 'center',
                                                backgroundImage: `url(${item.imageDescription})`,
                                                backgroundSize: 'cover',
                                                height: '200px',
                                            }}>
                                            </div>
                                        </Flex>
                                    }
                                >
                                    <Flex vertical style={{ textAlign: 'left' }}>
                                        <Text
                                            ellipsis={
                                                { Row: 1, }
                                            }
                                            style={{ fontSize: '18px' }}>{item.projectName}</Text>
                                        <Paragraph
                                            ellipsis={
                                                { Row: 3, }
                                            }
                                        >Yêu cầu KH: {item.description}
                                        </Paragraph>
                                        {item.progress === 100 &&
                                            <Text>Ngày hoàn thành: {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Text>}
                                    </Flex>
                                </Card>
                            </Col>
                        )
                    })
                }

            </Flex>
        </>
    )
}

export default MainContent;