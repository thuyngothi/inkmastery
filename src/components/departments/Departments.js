import { useEffect, useState } from "react";
import { SearchOutlined, UsergroupAddOutlined, EditOutlined, FolderAddOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Flex, Input, Modal, Typography, Form, Row, Select, message } from "antd"

import styles from './Departments.module.scss'
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import clsx from "clsx";

const { Title, Text } = Typography
const Deparments = () => {
    const token = localStorage.getItem('token')
    const instance = axios.create({
        baseURL: 'https://localhost:44389',
        timeout: 5000,
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const [departments, setDepartments] = useState([])
    const [isChange, setIsChange] = useState(false)
    const [users, setUsers] = useState([])

    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenKpi, setIsOpenKpi] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)

    const [formData, setFormData] = useState({})

    // Logic get all users
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:44389/api/User/GetAllUsers')
                if (response && response.status === 200) {
                    setUsers(response.data)
                } else {
                    message.error('Lỗi!')
                }
            } catch (error) {
                console.error('Có lỗi xảy ra: ', error)
            }
        }
        fetchData()
    }, [])

    console.log(users)
    let userInfors = []
    const getInfor = () => {
        users.map(item => {
            const { fullName, id } = item;
            userInfors.push({ value: id, label: fullName })
        })
    }
    getInfor()
    console.log(userInfors)

    // Logic get All Departments
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:44389/api/Admin/GetAllTeams')

                if (response && response.status === 200) {
                    setDepartments(response.data)
                    setIsChange(false)
                } else {
                    message.error('Lỗi!')
                }
            } catch (error) {
                console.error('Có lỗi xảy ra: ', error)
            }
        }

        fetchData();
    }, [isChange])
    console.log(departments);

    // Logic Create New department
    const openCreate = () => setIsOpenCreate(true)
    const closeCreate = () => setIsOpenCreate(false)
    const handleCreate = async (values) => {              
        try {
            const response = await instance.post('api/Admin/CreateTeam', values)
            console.log(response)
            if (response && response.data.status === 200) {
                message.success('Tạo mới phòng ban thành công!')
                console.log('Tạo mới thành công: ', response.data)
                setIsOpenCreate(false)
                setIsChange(true)
            } else {
                message.error(response.data.message)
            }
        } catch (error) {
            console.error('Không thể tạo mới phòng ban! Lỗi: ', error)
        }
    }

    // Logic Edit department
    const openEdit = (data) => {
        setIsOpenEdit(true)
        setFormData(prev => {
            return {...prev, 
                id: data.id,               
            }
        })
    }
    const closeEdit = () => setIsOpenEdit(false)
    const handleEdit = (values) => {

    }

    // Logic Add KPI for department
    const openKpi = () => setIsOpenKpi(true)
    const closeKpi = () => setIsOpenKpi(false)
    const handleAddKpi = () => {

    }

    // Logic Delete Department
    const openDelete = (data) => {
        setIsOpenDelete(true)
        setFormData(prev => {
            return {...prev, teamId: data.id}
        })
    }
    const closeDelete = () => setIsOpenDelete(false)
    const handleDelete = async() => {
        try{
            const response = await instance.delete(`/api/Admin/DeleteTeam/${formData.teamId}`)
            if(response && response.status === 200){
                setIsChange(true);
                setIsOpenDelete(false);
                delete formData.teamId
                message.success('Xóa phòng ban thành công')
            }else(
                message.error('Không thể xóa phòng ban!')
            )
        }catch(error) {
            console.error('Không thể xóa phòng ban! Lỗi: ', error)
        }
    }

    return (
        <>
            <Flex vertical gap='middle' className={styles.departmentContainer}>
                <Flex gap='middle' style={{ width: '100%' }} align="center" justify="space-around">
                    <Flex style={{ width: '80%' }} gap='middle'>
                        <Input prefix={<SearchOutlined />} className='searchInput' placeholder="Tìm kiếm phòng ban" />
                        <Button className="submitBtn">Tìm kiếm</Button>
                    </Flex>
                    <button className={clsx(styles.btn, styles.createBtn)}
                        onClick={openCreate}
                    >
                        +
                    </button>
                    <Modal
                        className="modal"
                        open={isOpenCreate}
                        onCancel={closeCreate}
                        title='Tạo mới phòng ban'
                        footer={null}
                    >
                        <Form layout="vertical" onFinish={handleCreate}>
                            <Flex justify="space-between">
                                <Form.Item
                                    name='name'
                                    label='Tên phòng ban'
                                    style={{
                                        width: '45%'
                                    }}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name='managerId'
                                    label='Quản lý'
                                    style={{
                                        width: '45%'
                                    }}
                                >
                                    <Select
                                        options={userInfors}
                                    >
                                    </Select>
                                </Form.Item>
                            </Flex>
                            <Form.Item
                                name='description'
                                label='Mô tả'>
                                <TextArea />
                            </Form.Item>
                            <Flex gap='middle'>
                                <Form.Item>
                                    <Button htmlType="submit" type="primary">Thêm mới</Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={closeCreate} >Thoát</Button>
                                </Form.Item>
                            </Flex>
                        </Form>
                    </Modal>

                </Flex>

                <Flex wrap gap='large' justify="space-between">
                    <Modal
                        className="modal"
                        open={isOpenEdit}
                        onCancel={closeEdit}
                        title='Sửa thông tin phòng ban'
                    >
                        <Form layout="vertical">
                            <Form.Item
                                name='name'
                                label='Tên phòng ban'
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='description'
                                label='Mô tả'>
                                <TextArea />
                            </Form.Item>
                        </Form>
                    </Modal>

                    <Modal
                        className="modal"
                        open={isOpenKpi}
                        onCancel={closeKpi}
                        title='Giao KPI dự án'
                    >
                        <Form layout="vertical">
                            <Flex justify="space-around">
                                <Form.Item
                                    name=''
                                    label='Tên chỉ tiêu'
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name=''
                                    label='Nhân viên'>
                                    <Input />
                                </Form.Item>
                            </Flex>
                            <Flex justify="space-around">
                                <Form.Item
                                    name=''
                                    label='Thời gian làm'
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name=''
                                    label='Chỉ tiêu'>
                                    <Input />
                                </Form.Item>
                            </Flex>
                        </Form>
                    </Modal>

                    <Modal
                        className="modal"
                        open={isOpenDelete}
                        onCancel={closeDelete}
                        footer={null}
                        title='Bạn chắc chắn xóa phòng ban này?'
                    >
                        <Flex gap='middle'>
                            <Button onClick={handleDelete} type="primary">Xóa</Button>
                            <Button onClick={closeDelete}>Thoát</Button>
                        </Flex>
                    </Modal>

                    {
                        departments.map((item, index) => (
                            <Col xs={24} sm={11} xl={7} className={styles.department}>
                                <Flex gap='small' vertical style={{ textAlign: 'left', padding: '16px 12px' }}>
                                    <Text style={{ fontSize: '18px' }}>Tên phòng ban: {item.name}</Text>
                                    <Text
                                        style={{ paddingLeft: '8px' }}
                                    >
                                        Số thành viên: {item.numberOfMember}<UsergroupAddOutlined />
                                    </Text>
                                    <Text
                                        style={{ paddingLeft: '8px' }}
                                    >
                                        Quản lý: {item.managerName}
                                    </Text>
                                </Flex>

                                <Divider style={{ backgroundColor: '#686d8a', margin: '0' }} />

                                <Flex gap='small' style={{ padding: '12px' }}>
                                    <button className={clsx(styles.btn, styles.editBtn)} onClick={()=> openEdit(item)}><EditOutlined /></button>

                                    <button className={clsx(styles.btn, styles.kpiBtn)} onClick={openKpi}><FolderAddOutlined /></button>

                                    <button className={clsx(styles.btn, styles.deleteBtn)} onClick={() => openDelete(item)}><DeleteOutlined /></button>
                                </Flex>
                            </Col>
                        ))
                    }
                </Flex>
            </Flex>
        </>
    )
}
export default Deparments;