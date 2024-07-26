import { useState, useEffect } from "react"
import axios from "axios"
import { Flex, Typography, Button, Input, Card, Col, message, Modal, Form, Select, Image, DatePicker } from "antd"
import TextArea from "antd/es/input/TextArea"
import moment from "moment"
import clsx from "clsx"

import styles from './Project.module.scss'

const { Title } = Typography

const ModalCreate = ({ open, changeCreateStatus, changeProjectsStatus }) => {
    const [leaders, setLeaders] = useState([])
    const [customers, setCustomers] = useState([])
    const [avatar, setAvatar] = useState({})
    const [valueAvatar, setValueAvatar] = useState('')
    const [valueDate, setValueDate] = useState('')
    const [data, setData] = useState({})

    const [errors, setErrors] = useState({})

    const token = localStorage.getItem('token')
    const instance = axios.create({
        baseURL: 'https://localhost:44389',
        timeout: 5000,
        headers: { 'Authorization': `Bearer ${token}` }
    });

    // Logic get All Leaders
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get('api/User/GetAllUserContainsLeaderRole')
                if (response.status === 200) {
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

    // Logic get All Customers
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get('/api/Admin/GetAllCustomers')
                if (response.status === 200) {
                    setCustomers(response.data)
                }
            } catch (error) {
                console.log('Có lỗi xảy ra: ', error)
            }
        }
        fetchData()
    }, [])
    let customerInfors = []
    const getCustomerInfor = () => {
        customers.map(item => {
            const { fullName, id } = item;
            customerInfors.push({ value: id, label: fullName })
        })
    }
    getCustomerInfor()

    // Logic Clean up avatar
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        }
    }, [avatar])

    // Logic set value on Change
    const fileChange = (e) => {
        console.log(e.target)
        const file = e.target.files[0]
        console.log(file)
        file.preview = URL.createObjectURL(file)
        setAvatar(file)

        console.log(data)
        setData(prev => {
            return {
                ...prev,
                [e.target.name]: file,
            }
        })
        setValueAvatar(e.target.value)
    }

    const handleDateChange = (date) => {
        setData(prev => {
            return {
                ...prev,
                expectedEndDate: date ? moment(date).toISOString() : null
            }
        });
        setValueDate(date)
        if (errors.expectedEndDate) {
            delete (errors.expectedEndDate)
        }
    };

    const handleChange = (e) => {
        console.log(e.target)
        const { name, value } = e.target
        setData(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })

        if (errors[name]) {
            delete (errors[name])
        }
    }
    const handleSelectLeader = (value) => {
        setData(prev => {
            return {
                ...prev,
                leader: value,
            }
        })
        if (errors.leader) {
            delete (errors.leader)
        }
    }
    const handleSelectCustomer = (value) => {
        setData(prev => {
            return {
                ...prev,
                customer: value,
            }
        })
        if (errors.customer) {
            delete (errors.customer)
        }
    }

    // Logic Validate on Blur 
    const mouseBlurInput = (e) => {
        const { name, value} = e.target
        console.log(e.target)
        if (!value) {
            setErrors(prev => (
                {
                    ...prev,
                    [name]: `Vui lòng nhập dữ liệu ${name}`
                }
            ))
        } else if (value.length < 10) {
            setErrors(prev => (
                {
                    ...prev,
                    [name]: `${name} phải tối thiểu 10 ký tự!`
                }
            ))
        } else if (value.length > 255) {
            setErrors(prev => (
                {
                    ...prev,
                    [name]: `${name} không được quá 255 ký tự!`
                }
            ))
        }
    }

    // Logic Create New Project
    const handleCreate = async () => {
        console.log(data)

        const formData = new FormData()
        formData.append('ProjectName', data.projectName)
        formData.append('Description', data.description)
        formData.append('ExpectedEndDate', data.expectedEndDate)
        formData.append('RequestDescriptionFromCustomer', data.requirement)
        formData.append('LeaderId', data.leader)
        formData.append('CustomerId', data.customer)
        formData.append('StartingPrice', data.price)
        formData.append('CommissionPercentage', data.commission)
        formData.append('ImageDescription', data.projectImg)

        const { projectName, description, expectedEndDate, requirement, leader, customer } = data
        let newError = {};
        if (!projectName) newError.projectName = 'Vui lòng nhập vào tên dự án!'
        if (!description) newError.description = 'Vui lòng nhập vào mô tả!'
        if (!expectedEndDate) newError.expectedEndDate = 'Vui lòng nhập vào dự kiến hoàn thành!'
        if (!requirement) newError.requirement = 'Vui lòng nhập yêu cầu khách hàng!'
        if (!leader) newError.leader = 'Vui lòng chọn leader!'
        if (!customer) newError.customer = 'Vui lòng chọn khách hàng!'

        //setError(newError)
        if (Object.keys(newError).length > 0) {
            setErrors(newError)
            return;
        }

        try {
            const instance = axios.create({
                baseURL: 'https://localhost:44389',
                timeout: 5000,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            const response = await instance.post('api/Admin/CreateProject', formData)
            console.log(response)
            if (response && response.data.status === 200) {
                message.success('Tạo mới Project thành công!')
                console.log('Tạo mới thành công: ', response.data)
                changeCreateStatus(false)
                changeProjectsStatus(true)
                setData({})
                setValueAvatar('')
                setValueDate('')
            } else {
                message.error(response.data.message)
            }
        } catch (error) {
            console.error('Không thể tạo mới dự án! Lỗi: ', error)
        }
    }

    return (
        <>
            <Modal
                open={open}
                onCancel={() => {
                    changeCreateStatus(false);
                    setAvatar({})
                    setData({})
                    setValueAvatar('')
                    setValueDate('')
                    setErrors({})
                }}
                footer={null}
            >
                <Title style={{ textAlign: 'center' }} level={3}>Thêm dự án</Title>
                <Form layout="vertical"
                    onFinish={handleCreate}
                >
                    <Flex align="center" gap='middle'>
                        <Flex className={styles.projectImg}>
                            {!!avatar ? <img src={avatar.preview} /> : <img />}
                        </Flex>
                        <Form.Item>
                            <Image />
                            <Input
                                name='projectImg'
                                type="file"
                                value={valueAvatar}
                                onChange={fileChange}
                            />
                        </Form.Item>
                    </Flex>

                    <Flex justify="space-between">
                        <Form.Item
                            label='Tên dự án'
                            style={{
                                width: '46%'
                            }}
                            required
                            validateStatus={errors.projectName ? 'error' : ''}
                            help={errors.projectName || ''}
                        >
                            <Input name='projectName'
                                label='Tên dự án'
                                value={data.projectName}
                                onChange={handleChange}
                                onBlur={mouseBlurInput}
                            />
                        </Form.Item>
                        <Form.Item
                            required
                            label='Ngày dự kiến hoàn thành'
                            style={{
                                width: '46%'
                            }}
                            validateStatus={errors.expectedEndDate ? 'error' : ''}
                            help={errors.expectedEndDate || ''}
                        >
                            <DatePicker
                                label='dự kiến hoàn thành'
                                name='expectedEndDate'
                                value={valueDate}
                                placeholder='yyyy-mm-dd'
                                className={styles.inforInput}
                                onChange={handleDateChange}
                                onBlur={mouseBlurInput}
                            />
                        </Form.Item>
                    </Flex>

                    <Flex justify="space-between">
                        <Form.Item
                            required
                            label='Người nhận dự án'
                            style={{
                                width: '46%'
                            }}
                            validateStatus={errors.leader ? 'error' : ''}
                            help={errors.leader || ''}
                        >
                            <Select
                                label='leader'
                                options={leaderInfors}
                                value={data.leader}
                                onChange={handleSelectLeader}
                                onBlur={mouseBlurInput}
                            >
                            </Select>
                        </Form.Item>
                        <Form.Item
                            required
                            label='Khách hàng'
                            style={{
                                width: '46%'
                            }}
                            validateStatus={errors.customer ? 'error' : ''}
                            help={errors.customer || ''}
                        >
                            <Select
                                name='customer'
                                options={customerInfors}
                                value={data.customer}
                                onChange={handleSelectCustomer}
                                onBlur={mouseBlurInput}
                            >
                            </Select>
                        </Form.Item>
                    </Flex>

                    <Flex justify="space-between">
                        <Form.Item
                            label='Giá dự án'
                            style={{
                                width: '46%'
                            }}
                        >
                            <Input
                                name='price'
                                value={data.price}
                                onChange={handleChange}
                                onBlur={mouseBlurInput}
                            />
                        </Form.Item>
                        <Form.Item
                            label='Phần trăm hoa hồng nhân viên'
                            style={{
                                width: '46%'
                            }}
                        >
                            <Input
                                name='commission'
                                value={data.commission}
                                onChange={handleChange}
                            >
                            </Input>
                        </Form.Item>
                    </Flex>

                    <Form.Item
                        required
                        label='Yêu cầu khách hàng'
                        validateStatus={errors.requirement ? 'error' : ''}
                        help={errors.requirement || ''}
                    >
                        <TextArea name='requirement'
                            value={data.requirement}
                            onChange={handleChange}
                            onBlur={mouseBlurInput}
                        />
                    </Form.Item>

                    <Form.Item
                        required
                        label='Mô tả dự án'
                        validateStatus={errors.description ? 'error' : ''}
                        help={errors.description || ''}
                    >
                        <TextArea name='description'
                            value={data.description}
                            onChange={handleChange}
                            onBlur={mouseBlurInput}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Flex gap='middle' justify="flex-end">
                            <Button className={clsx('submitBtn', styles.updateBtn)} htmlType="submit" type="primary">Tạo mới</Button>
                            <Button className="modal-cancelBtn"
                                onClick={() => {
                                    changeCreateStatus(false);
                                    setAvatar({})
                                    setData({})
                                    setValueAvatar('')
                                    setValueDate('')
                                    setErrors({})
                                }}
                            >
                                Thoát
                            </Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ModalCreate;