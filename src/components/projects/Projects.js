import { Flex, Typography, Button, Input, Card, Col } from "antd"
import { SearchOutlined } from "@ant-design/icons"

import styles from './Project.module.scss'
import logo from '../../assets/images/logoPrint.png'
import { useEffect, useState } from "react"
import axios from "axios"
const { Title, Text } = Typography
const Projects = () => {
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
            <Flex vertical className={styles.projectsContainer}>
                <Flex style={{ width: '80%' }} gap='middle'>
                    <Input prefix={<SearchOutlined />} className='searchInput' placeholder="Tìm kiếm project" />
                    <Button className="submitBtn">Tìm kiếm</Button>
                </Flex>

                <Flex wrap gap='middle' style={{ padding: '16px' }}>
                    {
                        projects.map((item, index) => {
                            const date = new Date(item.startDate)

                            return (
                                <Col key={index} xs={24} sm={24} md={11} lg={7}>
                                    <Card
                                        hoverable
                                        style={{ width: '95%', backgroundColor: '#2f3349' }}
                                        cover={
                                            <img src='https://res.cloudinary.com/dacc055vz/image/upload/v1717007151/xyz-abc_638526291478799100image.jpg' />
                                        }
                                    >
                                        <Flex vertical style={{ textAlign: 'left' }}>
                                            <Text 
                                                ellipsis = {
                                                    {Row: 1,}
                                                }
                                            style={{ fontSize: '18px' }}>{item.projectName}</Text>
                                            <Text>Leader: {item.leader}</Text>
                                            <Text>Ngày tạo: {`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</Text>
                                            <Text>Tiến độ: <span style={{color:'#15b468'}}>{item.progress}%</span></Text>
                                        </Flex>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Flex>
            </Flex>
        </>
    )
}
export default Projects;