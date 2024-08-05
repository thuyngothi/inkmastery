import { useEffect, useState } from "react";
import { SearchOutlined, UsergroupAddOutlined, EditOutlined, FolderAddOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Flex, Input, Modal, Typography, Form, Row, Select, message } from "antd"
import axios from "axios";
import clsx from "clsx";


import styles from './Departments.module.scss'
import TextArea from "antd/es/input/TextArea";
import instance from '../axiosInstance'

const { Title, Text } = Typography
const Deparments = () => {

    const [departments, setDepartments] = useState([])
    const [isChange, setIsChange] = useState(false)
    const [leaders, setLeaders] = useState([])

    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenKpi, setIsOpenKpi] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)

    const [formData, setFormData] = useState({})

    // Logic change formdata when input change
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }
    const onChangeSelect = (value) => {
        setFormData(prev => {
            return {
                ...prev,
                managerId: value,
            }
        })
    }

    // Logic get all Leaders
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:44389/api/User/GetAllUserContainsLeaderRole')
                if (response && response.status === 200) {
                    setLeaders(response.data)
                } else {
                    message.error('Lỗi!')
                }
            } catch (error) {
                console.error('Có lỗi xảy ra: ', error)
            }
        }
        fetchData()
    }, [])

    // Logic get fullName and id of Leader
    let leaderInfors = []
    const getInfor = () => {
        leaders.map(item => {
            const { fullName, id } = item;
            leaderInfors.push({ value: id, label: fullName })
        })
    }
    getInfor()

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
    // console.log(departments);

    // Logic Create New department
    const openCreate = () => setIsOpenCreate(true)
    const closeCreate = () => {
        setIsOpenCreate(false)
        setFormData({})
    }
    const handleCreate = async () => {
        try {
            const response = await instance.post('api/Admin/CreateTeam', formData)
            console.log(response)
            if (response && response.data.status === 200) {
                message.success('Tạo mới phòng ban thành công!')
                console.log('Tạo mới thành công: ', response.data)
                setIsOpenCreate(false)
                setIsChange(true)
                setFormData({})
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
            return {
                ...prev,
                id: data.id,
            }
        })
    }
    const closeEdit = () => {
        setIsOpenEdit(false)
        setFormData({})
    }
    const handleEdit = async (values) => {
        try {
            const response = await instance.put('api/Admin/UpdateTeam', formData)
            console.log(response)
            if (response.data.status === 200) {
                setIsChange(true)
                setIsOpenEdit(false);
                delete formData.id;
                setFormData({})
                message.success('Sửa thông tin phòng ban thành công!')
            } else{
                message.error(response.data.message)
            }
        } catch (error) {
            console.error('Không thể update phòng ban: ', error)
            message.error('Không thể update phòng ban!')
        }
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
            return { ...prev, teamId: data.id }
        })
    }
    const closeDelete = () => setIsOpenDelete(false)
    const handleDelete = async () => {
        try {
            const response = await instance.delete(`/api/Admin/DeleteTeam/${formData.teamId}`)
            if (response && response.status === 200) {
                setIsChange(true);
                setIsOpenDelete(false);
                delete formData.teamId
                message.success('Xóa phòng ban thành công')
            } else (
                message.error('Không thể xóa phòng ban!')
            )
        } catch (error) {
            console.error('Không thể xóa phòng ban! Lỗi: ', error)
        }
    }

    return (
        <>
            <Flex vertical gap='middle' className={styles.departmentContainer}>
                <Flex gap='middle' style={{ width: '100%' }} align="center" justify="space-between">
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
                        open={isOpenCreate}
                        onCancel={closeCreate}
                        footer={null}
                    >
                        <Title level={3}>Tạo mới phòng ban</Title>
                        <Form layout="vertical" onFinish={handleCreate}>
                            <Flex justify="space-between">
                                <Form.Item
                                    label='Tên phòng ban'
                                    style={{
                                        width: '46%'
                                    }}
                                >
                                    <Input name='name' value={formData.name} onChange={onChange} />
                                </Form.Item>
                                <Form.Item
                                    label='Quản lý'
                                    style={{
                                        width: '46%'
                                    }}
                                >
                                    <Select
                                        name='managerId'
                                        options={leaderInfors}
                                        value={formData.managerId}
                                        onChange={onChangeSelect}
                                    >
                                    </Select>
                                </Form.Item>
                            </Flex>
                            <Form.Item
                                label='Mô tả'>
                                <TextArea name='description' value={formData.description} onChange={onChange} />
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

                <Flex wrap gap='large' justify="flex-start">
                    <Modal
                        open={isOpenEdit}
                        onCancel={closeEdit}
                        footer={null}
                        style={{
                            paddingBottom:'1px !important'
                        }}
                    >
                        <Title level={3}>Sửa thông tin phòng ban</Title>
                        <Form layout="vertical" onFinish={handleEdit}>
                            <Form.Item
                                label='Tên phòng ban'
                            >
                                <Input name='name' value={formData.name} onChange={onChange} />
                            </Form.Item>
                            <Form.Item
                                label='Mô tả'
                            >
                                <TextArea name='description' value={formData.description} onChange={onChange} />
                            </Form.Item>
                            <Form.Item
                                label='Quản lý'
                            >
                                <Select
                                    options={leaderInfors}
                                    name='managerId'
                                    value={formData.managerId}
                                    onChange={onChangeSelect}
                                >
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Flex gap='middle' justify="flex-end">
                                    <Button className={clsx('submitBtn', styles.updateBtn)} htmlType="submit" type="primary">Cập nhật</Button>
                                    <Button className="modal-cancelBtn" onClick={closeEdit}>Thoát</Button>
                                </Flex>
                            </Form.Item>
                        </Form>
                    </Modal>

                    <Modal
                        className="modal"
                        open={isOpenKpi}
                        onCancel={closeKpi}
                        footer={null}
                    >
                        <Title level={3}>Giao KPI dự án</Title>
                        <Form layout="vertical">
                            <Flex gap='middle' justify="space-around">
                                <Form.Item
                                    style={{ width: '48%' }}
                                    name=''
                                    label='Tên chỉ tiêu'
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: '48%' }}
                                    name=''
                                    label='Nhân viên'>
                                    <Input />
                                </Form.Item>
                            </Flex>
                            <Flex gap='middle' justify="space-around">
                                <Form.Item
                                    style={{ width: '48%' }}
                                    name=''
                                    label='Thời gian làm'
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: '48%' }}
                                    name=''
                                    label='Chỉ tiêu'>
                                    <Input />
                                </Form.Item>
                            </Flex>
                            <Form.Item>
                                <Flex gap='middle' justify="flex-end">
                                    <Button className={clsx('submitBtn', styles.updateBtn)} htmlType="submit" type="primary">Cập nhật</Button>
                                    <Button className="modal-cancelBtn" onClick={closeKpi}>Thoát</Button>
                                </Flex>
                            </Form.Item>
                        </Form>
                    </Modal>

                    <Modal
                        className="modal"
                        open={isOpenDelete}
                        onCancel={closeDelete}
                        footer={null}
                    >
                        <Title level={3}>Bạn chắc chắn xóa phòng ban này?</Title>
                        <Flex gap='middle' justify="flex-end">
                            <Button className={clsx('submitBtn', styles.updateBtn)} htmlType="submit" type="primary" onClick={handleDelete}>Xóa</Button>
                            <Button className="modal-cancelBtn" onClick={closeDelete}>Thoát</Button>
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
                                    <button className={clsx(styles.btn, styles.editBtn)} onClick={() => openEdit(item)}><EditOutlined /></button>

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