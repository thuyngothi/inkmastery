import { useEffect, useState } from "react";
import { DeleteOutlined, SearchOutlined, UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Button, Textarea, Divider, Flex, Input, Modal, Typography, Form, Row, Select, message, Table, Space } from "antd"

import styles from './Employee.module.scss'
import TextArea from "antd/es/input/TextArea";
import clsx from "clsx";
import axios from "axios";
import { Await } from "react-router-dom";
const { Title, Text } = Typography
const { Column, ColumnGroup } = Table

const Employee = () => {
    const token = localStorage.getItem('token')
    const instance = axios.create({
        baseURL: 'https://localhost:44389',
        timeout: 5000,
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const [departments, setDepartments] = useState([])
    const [employees, setEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState('')
    const [isChange, setIsChange] = useState(false)

    const [isEditDepartment, setIsEditDepartment] = useState(false)
    const [isEditRoles, setIsEditRoles] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)

    const [formData, setFormData] = useState({})

    // Logic get data when change data input
    const onChangeSelect = (value) => {
        setFormData(prev => {
            return {
                ...prev,
                teamId: value,
            }
        })
    }

    // Logic get All Users
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://localhost:44389/api/User/GetAllUsers')
            if (response && response.status === 200) {
                console.log(response.data)
                let data = []
                response.data.forEach((element, index) => {
                    const { fullName, email, phoneNumber, teamName, id } = element;
                    data.push({
                        key: id,
                        fullName,
                        email,
                        phoneNumber,
                        teamName,
                    })
                });
                setEmployees(data)
                setIsChange(false)
            }
        }

        fetchData();
    }, [isChange])
    // console.log(employees)

    // Logic get All Departments
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:44389/api/Admin/GetAllTeams')

                if (response && response.status === 200) {
                    setDepartments(prev => {
                        const resultData = response.data.map(item => {
                            const { name, id } = item
                            return {
                                value: id,
                                label: name,
                            }
                        })
                        return resultData
                    })
                }
            } catch (error) {
                console.error('Có lỗi xảy ra: ', error)
            }
        }

        fetchData();
    }, [isChange])
    // console.log(departments);

    // Logic Edit employee's department
    const openEditDepartment = (data) => {
        setIsEditDepartment(true)
        setSelectedEmployee(data.fullName)
        setFormData(prev => {
            return {
                ...prev,
                employeeId: data.key,
            }
        })
    }
    const closeEditDepartment = () => {
        setIsEditDepartment(false);
        setSelectedEmployee('');
        setFormData({});
    }
    // console.log(formData)
    const handleEditDepartment = async () => {
        try {
            const response = await instance.put('api/Admin/ChangeDepartmentForUser', formData)
            console.log(response)
            setIsChange(true)
            setIsEditDepartment(false)
            setFormData({})
            setSelectedEmployee('')
        } catch (error) {
            console.error('Có lỗi không thể cập nhật phòng ban: ', error)
        }
    }

    // Logic Edit employee's roles
    const openEditRoles = (data) => {
        setIsEditRoles(true)
        setSelectedEmployee(data.fullName)
    }
    const closeEditRoles = () => {
        setIsEditRoles(false)
        setSelectedEmployee('')
        setFormData({});
    }
    const handleEditRoles = () => {
    }

    // Logic Delete employee
    const openDelete = (data) => {
        setIsOpenDelete(true)
    }
    const closeDelete = () => setIsOpenDelete(false)
    const handleDelete = async () => {
        try {
            const response = await instance.delete(`/api/Admin/DeleteTeam/${formData.teamId}`)
            if (response && response.status === 200) {
                setIsChange(true);
                setIsOpenDelete(false);
                setFormData({})
                message.success('Xóa phòng ban thành công')
            } else (
                message.error('Không thể xóa phòng ban!')
            )
        } catch (error) {
            console.error('Không thể xóa phòng ban! Lỗi: ', error)
        }
    }

    // Define Collumn of Table
    const columns = [
        {
            title: 'HỌ VÀ TÊN',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'SỐ ĐIỆN THOẠI',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'NHÓM',
            dataIndex: 'teamName',
            key: 'teamName',
        },
        {
            title: 'THAO TÁC',
            key: 'action',
            render: (_, record) => {
                console.log(record)
                return (
                    <Space size="middle">
                        <Button className={clsx(styles.btn, styles.changeManagementBtn)}
                            shape="circle"
                            onClick={() => openEditDepartment(record)}
                        >
                            {<UserAddOutlined />}
                        </Button>
                        <Button className={clsx(styles.btn, styles.addRoleBtn)}
                            shape="circle"
                            onClick={() => openEditRoles(record)}
                        >
                            {<UsergroupAddOutlined />}
                        </Button>
                        <Button className={clsx(styles.btn, styles.deleteBtn)}
                            shape="circle"
                            onClick={openDelete}
                        >
                            {<DeleteOutlined />}
                        </Button>
                    </Space>
                )
            },
        },
    ]

    return (
        <>
            <Flex vertical gap='middle' className={styles.employeeContainer}>
                <Flex style={{ width: '80%' }} gap='middle'>
                    <Input prefix={<SearchOutlined />} className='searchInput' placeholder="Tìm kiếm nhân viên" />
                    <Button className="submitBtn">Tìm kiếm</Button>
                </Flex>

                <Modal
                    className={styles.modal}
                    open={isEditDepartment}
                    onCancel={closeEditDepartment}
                    footer={null}
                >
                    <Title className={styles.modalTitle} level={3}>Cập nhật phòng ban nhân viên</Title>
                    <Text className={styles.modalEmployee}>Nhân viên: {selectedEmployee}</Text>
                    <Form layout="vertical" onFinish={handleEditDepartment}>
                        <Form.Item
                            label='Phòng ban'
                        >
                            <Select
                                name='teamId'
                                options={departments}
                                value={formData.teamId}
                                onChange={onChangeSelect}
                            >
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Flex gap='middle' justify="flex-end">
                                <Button className={clsx('submitBtn', styles.updateBtn)} htmlType="submit" type="primary">Cập nhật</Button>
                                <Button className="modal-cancelBtn" onClick={closeEditDepartment}>Thoát</Button>
                            </Flex>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    open={isEditRoles}
                    onCancel={closeEditRoles}
                    footer={null}
                >
                    <Title className={styles.modalTitle} level={3}>Cập nhật quyền hạn</Title>
                    <Text className={styles.modalEmployee}>Nhân viên: {selectedEmployee}</Text>
                    <Form layout="vertical">
                        <Form.Item
                            label='Quyền hạn'
                        >
                            <Select
                                name='permission'
                            >
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Flex gap='middle' justify="flex-end">
                                <Button className={clsx('submitBtn', styles.updateBtn)} htmlType="submit" type="primary">Cập nhật</Button>
                                <Button className="modal-cancelBtn" onClick={closeEditRoles}>Thoát</Button>
                            </Flex>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    open={isOpenDelete}
                    onCancel={closeDelete}
                    footer={null}
                >
                    <Title level={3}>Bạn chắc chắn xóa nhân viên này này?</Title>
                    <Flex gap='middle' justify="flex-end">
                        <Button className="submitBtn" onClick={handleDelete} type="primary">Xóa</Button>
                        <Button className="modal-cancelBtn" onClick={closeDelete}>Thoát</Button>
                    </Flex>
                </Modal>

                <Table className={styles.tableEmployee} columns={columns} dataSource={employees} />
            </Flex>
        </>
    )
}
export default Employee;