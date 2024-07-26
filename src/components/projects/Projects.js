import { Flex, Typography, Button, Input, Card, Col, message } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import axios from "axios"
import clsx from "clsx"

import { useSelectedProject } from "../../App"

import styles from './Project.module.scss'
import ModalCreate from "./ModalCreate"

const { Text } = Typography

const Projects = () => {
    const { setSelectedProject } = useSelectedProject();

    const [projects, setProjects] = useState([])
    const [isChange, setIsChange] = useState('false')
    const [isOpenCreate, setIsOpenCreate] = useState(false)

    const navigate = useNavigate()

    const token = localStorage.getItem('token')
    const instance = axios.create({
        baseURL: 'https://localhost:44389',
        timeout: 5000,
        headers: { 'Authorization': `Bearer ${token}` }
    });

    // Logic Get all projects
    useEffect(() => {
        const fetchData = async () => {
            const response = await instance.get('api/Admin/GetAllProject')
            if (response && response.status === 200) {
                setProjects(response.data)
                setIsChange(false)
            }
        }
        fetchData()
    }, [isChange])

    const openCreate = () => setIsOpenCreate(true)
    const changeCreateStatus = (value) => {
        setIsOpenCreate(value);
    }

    // Function set change status list Projects
    const changeProjectsStatus = (value) => {
        setIsChange(value)
    }

    return (
        <>
            <Flex vertical className={styles.projectsContainer}>
                <Flex justify="space-between">
                    <Flex style={{ width: '80%' }} gap='middle'>
                        <Input prefix={<SearchOutlined />} className='searchInput' placeholder="Tìm kiếm project" />
                        <Button className="submitBtn">Tìm kiếm</Button>
                    </Flex>
                    <button className={clsx(styles.btn, styles.createBtn)}
                        onClick={openCreate}
                    >
                        +
                    </button>

                    <ModalCreate open={isOpenCreate}
                        changeCreateStatus={changeCreateStatus}
                        changeProjectsStatus={changeProjectsStatus}
                    />

                </Flex>

                <Flex wrap gap='large' style={{ padding: '16px' }} justify="flex-start">
                    {
                        projects.map((item, index) => {
                            const date = new Date(item.startDate)

                            return (
                                <Col key={index} xs={24} sm={24} md={11} lg={7}
                                >
                                    <Card
                                        hoverable
                                        style={{ width: '95%', backgroundColor: '#2f3349' }}
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
                                        onClick={() => {
                                            setSelectedProject(item)
                                            navigate('project_process')
                                        }
                                        }
                                    >
                                        <Flex vertical style={{ textAlign: 'left' }}>
                                            <Text
                                                ellipsis={
                                                    { Row: 1, }
                                                }
                                                style={{ fontSize: '18px' }}>{item.projectName}</Text>
                                            <Text>Leader: {item.leader}</Text>
                                            <Text>Ngày tạo: {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Text>
                                            <Text>Tiến độ: <span style={{ color: '#15b468' }}>{item.progress}%</span></Text>
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