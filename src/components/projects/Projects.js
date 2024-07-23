import { Flex, Typography, Button, Input, Card, Col, message, Modal, Form, Select, Image } from "antd"
import TextArea from "antd/es/input/TextArea"
import { SearchOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import axios from "axios"
import clsx from "clsx"

import styles from './Project.module.scss'
import logo from '../../assets/images/logoPrint.png'

const { Title, Text } = Typography
const Projects = () => {
    const [projects, setProjects] = useState([])
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [data, setData] = useState({})
    const [isChange, setIsChange] = useState('false')

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
            }
        }
        fetchData()
    }, [])

    // Logic Create New Project
    const openCreate = () => setIsOpenCreate(true)
    const closeCreate = () => {
        setIsOpenCreate(false)
        setData({})
    }
    const handleCreate = async () => {
        const formData = new FormData()
        try {
            const response = await instance.post('api/Admin/CreateProject', data)
            console.log(response)
            if (response && response.data.status === 200) {
                message.success('Tạo mới Project thành công!')
                console.log('Tạo mới thành công: ', response.data)
                setIsOpenCreate(false)
                setIsChange(true)
                setData({})
            } else {
                message.error(response.data.message)
            }
        } catch (error) {
            console.error('Không thể tạo mới dự án! Lỗi: ', error)
        }
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

                    <Modal
                        open={isOpenCreate}
                        onCancel={closeCreate}
                        footer={null}
                    >
                        <Title style={{textAlign:'center'}} level={3}>Thêm dự án</Title>
                        <Form layout="vertical"
                        // onFinish={handleCreate}
                        >
                            <Form.Item>
                                <Image />
                                <Input type="file"/>
                            </Form.Item>
                            <Flex justify="space-between">
                                <Form.Item
                                    label='Tên dự án'
                                    style={{
                                        width: '46%'
                                    }}
                                >
                                    <Input name='ProjectName'
                                        value={data.name}
                                    // onChange={onChange}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Dự kiến hoàn thành'
                                    style={{
                                        width: '46%'
                                    }}
                                >
                                    <Select
                                        name='managerId'
                                        // options={userInfors}
                                        value={data.managerId}
                                    // onChange={onChangeSelect}
                                    >
                                    </Select>
                                </Form.Item>
                            </Flex>
                            <Form.Item
                                label='Mô tả'>
                                <TextArea name='description'
                                    value={data.description}
                                    // onChange={onChange} 
                                    />
                            </Form.Item>
                            <Form.Item>
                                <Flex gap='middle' justify="flex-end">
                                    <Button className={clsx('submitBtn', styles.updateBtn)} htmlType="submit" type="primary">Tạo mới</Button>
                                    <Button className="modal-cancelBtn" onClick={closeCreate}>Thoát</Button>
                                </Flex>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Flex>

                <Flex wrap gap='large' style={{ padding: '16px' }} justify="flex-start">
                    {
                        projects.map((item, index) => {
                            const date = new Date(item.startDate)

                            return (
                                <Col key={index} xs={24} sm={24} md={11} lg={7}>
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