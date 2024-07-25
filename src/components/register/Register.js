import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment';

import { Flex, Typography, Form, Input, Button, Divider, Space, DatePicker, message, Col, Select } from 'antd'

import styles from './Register.module.scss'
import login_img from '../../assets/images/pages/auth-v2-register-illustration-dark.png'
import logo from '../../assets/images/logoPrint.png'
import clsx from 'clsx';
const { Title, Text, Paragraph } = Typography

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [teams, setTeams] = useState([])
    const navigate = useNavigate()

    const [data, setData] = useState({
        Username: '',
        Email: '',
        Password: '',
        FullName: '',
        PhoneNumber: '',
        DateOfBirth: null,
        Gender: '',
        TeamId: ''
    });
    //const [data, setData] = useState({})

    // Logic get all Teams
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:44389/api/Admin/GetAllTeams')

                if (response && response.status === 200) {
                    setTeams(response.data.map(item => {
                        return {
                            value: item.id,
                            label: item.name
                        }
                    }))
                } else {
                    message.error('Lỗi!')
                }
            } catch (error) {
                console.error('Có lỗi xảy ra: ', error)
            }
        }

        fetchData();
    }, [])

    const genderOptions = [
        {
            label: 'Nam',
            value: 1,
        },
        {
            label: 'Nữ',
            value: 2,
        }
    ]

    // General logic on Change input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
        if (errors[name]) {
            delete (errors[name])
        }
    };
    const handleSelectGender = (value) => {
        setData(prev => (
            {
                ...prev,
                Gender: value,
            }
        ))
    }
    const handleSelectTeam = (value) => {
        setData(prev => ({
            ...prev,
            TeamId: value,
        }))
    }

    const handleDateChange = (date, dateString) => {
        setData((prevFormData) => ({
            ...prevFormData,
            DateOfBirth: date ? moment(date).toISOString() : null
        }));
    };

    const mouseBlurInput = (e) => {
        const { name, value, placeholder } = e.target
        console.log(e.target)
        if (!value) {
            setErrors(prev => (
                {
                    ...prev,
                    [name]: `Vui lòng nhập ${placeholder}`
                }
            ))
        } else if (value.length < 4) {
            setErrors(prev => (
                {
                    ...prev,
                    [name]: `${placeholder} phải tối thiểu 4 ký tự!`
                }
            ))
        } else if (value.length > 12) {
            setErrors(prev => (
                {
                    ...prev,
                    [name]: `${placeholder} không được quá 12 ký tự!`
                }
            ))
        }
    }
    const mouseBlurEmail = (e) => {
        const Email = e.target.value
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!Email) {
            setErrors(prev => (
                {
                    ...prev,
                    Email: 'Vui lòng nhập Email!'
                }
            ))
        } else if (!regex.test(Email)) {
            setErrors(prev => (
                {
                    ...prev,
                    Email: 'Email đã nhập không đúng định dạng!'
                }
            ))
        }
    }
    const mouseBlurPassword = (e) => {
        const Password = e.target.value
        if (!Password) {
            setErrors(prev => (
                {
                    ...prev,
                    Password: 'Vui lòng nhập mật khẩu!'
                }
            ))
        } else if (Password.length < 4) {
            setErrors(prev => (
                {
                    ...prev,
                    Password: 'Mật khẩu phải tối thiểu 4 ký tự!'
                }
            ))
        } else if (Password.length > 12) {
            setErrors(prev => (
                {
                    ...prev,
                    Password: 'Mật khẩu không được quá 12 ký tự!'
                }
            ))
        }
    }
    const mouseBlurPhone = (e) => {
        const PhoneNumber = e.target.value
        const regex = /^(0[3|5|7|8|9])[0-9]{8}$|^(02)[0-9]{9}$/;
        if (!PhoneNumber) {
            setErrors(prev => (
                {
                    ...prev,
                    PhoneNumber: 'Vui lòng nhập số điện thoại!'
                }
            ))
        } else if (!regex.test(PhoneNumber)) {
            setErrors(prev => (
                {
                    ...prev,
                    PhoneNumber: 'Số điện thoại đã nhập không đúng định dạng!'
                }
            ))
        }
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('Username', data.Username);
        formData.append('Email', data.Email);
        formData.append('Password', data.Password);
        formData.append('FullName', data.FullName);
        formData.append('PhoneNumber', data.PhoneNumber);
        if (data.DateOfBirth) {
            formData.append('DateOfBirth', data.DateOfBirth);
        }
        formData.append('Gender', data.Gender);
        formData.append('TeamId', data.TeamId);

        //Validation
        const { Username, Email, Password, FullName, PhoneNumber, TeamId } = data;
        let newErrors = {};
        if (!Username) newErrors.Username = 'Vui lòng nhập tên tài khoản!';
        if (!Email) newErrors.Email = 'Vui lòng nhập Email!';
        if (!Password) newErrors.Password = 'Vui lòng nhập mật khẩu!';
        if (!FullName) newErrors.FullName = 'Vui lòng nhập họ tên!';
        if (!PhoneNumber) newErrors.PhoneNumber = 'Vui lòng nhập số điện thoại!';
        if (!TeamId) newErrors.TeamId = 'Vui lòng chọn team của bạn!'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true)
        try {
            const response = await axios.post('https://localhost:44389/api/Auth/Register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
            console.log(response.status)
            if (response.data.status === 200) {
                message.success('Registration successful!');
                console.log('Registration successful:', response.data);
                navigate('/')
            } else {
                message.error(response.data.message)
            }
        } catch (error) {
            console.error('Registration failed:', error);
            message.error('Register failed!');
        }
        setLoading(false)
        console.log(formData)
    };

    return (
        <>
            <Flex className={styles.container} wrap>
                <Col xs={24} lg={14} xl={16}
                    style={{
                        width: '65%',
                        backgroundColor: '#202336',
                        padding: '40px 0',
                    }}>
                    <img style={{ maxWidth: '60%' }} src={login_img}></img>
                </Col>

                <Col xs={24} lg={10} xl={8} className={styles.content}>
                    <Flex align='center'>
                        <img src={logo} style={{ width: '20%' }}></img>
                        <Title level={3} style={{ color: '#c7cbe3' }}>InkMastery</Title>
                    </Flex>

                    <Form
                        className={styles.formRegister}
                        layout='vertical'
                        wrapperCol={{ span: 24 }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            label='Tài khoản' required
                            validateStatus={errors.Username ? 'error' : ''}
                            help={errors.Username || ''}
                        >
                            <Input
                                name='Username'
                                value={data.Username}
                                className={styles.inforInput}
                                placeholder='Tài khoản'
                                onChange={handleChange}
                                onBlur={mouseBlurInput}
                            />
                        </Form.Item>

                        <Form.Item
                            label='Email' required
                            validateStatus={errors.Email ? 'error' : ''}
                            help={errors.Email || ''}
                        >
                            <Input
                                name='Email'
                                value={data.Email}
                                className={styles.inforInput}
                                placeholder='Email'
                                onChange={handleChange}
                                onBlur={mouseBlurEmail}
                            />
                        </Form.Item>

                        <Form.Item
                            label='Mật khẩu' required
                            validateStatus={errors.Password ? 'error' : ''}
                            help={errors.Password || ''}
                        >
                            <Input.Password
                                name='Password'
                                value={data.Password}
                                className={styles.inforInput}
                                placeholder='Mật khẩu'
                                onChange={handleChange}
                                onBlur={mouseBlurPassword}
                            />
                        </Form.Item>

                        <Form.Item
                            label='Họ và tên' required
                            validateStatus={errors.FullName ? 'error' : ''}
                            help={errors.FullName || ''}
                        >
                            <Input
                                name='FullName'
                                value={data.FullName}
                                className={styles.inforInput} placeholder='Họ tên'
                                onChange={handleChange}
                                onBlur={mouseBlurInput}
                            />
                        </Form.Item>

                        <Form.Item
                            label='Số điện thoại' required
                            validateStatus={errors.PhoneNumber ? 'error' : ''}
                            help={errors.PhoneNumber || ''}
                        >
                            <Input
                                name='PhoneNumber'
                                value={data.PhoneNumber}
                                className={styles.inforInput} placeholder='Tài khoản'
                                onChange={handleChange}
                                onBlur={mouseBlurPhone}
                            />
                        </Form.Item>

                        <Form.Item
                            label='Ngày sinh'
                        >
                            <DatePicker
                                name='DateOfBirth'
                                onChange={handleDateChange}
                                className={styles.inforInput} placeholder='yyyy-mm-dd'
                            />
                        </Form.Item>

                        <Form.Item
                            label='Giới tính'
                        >
                            <Select
                                name='Gender'
                                value={data.Gender}
                                onChange={handleSelectGender}
                                options={genderOptions}
                                className={styles.inforInput} placeholder='Giới tính' />
                        </Form.Item>
                        <Form.Item
                            label='Đội ngũ'
                            required
                            validateStatus={errors.TeamId ? 'error' : ''}
                            help={errors.TeamId || ''}
                        >
                            <Select
                                name='TeamId'                                
                                value={data.TeamId} 
                                options={teams}
                                onChange={handleSelectTeam}
                                className={styles.inforInput} placeholder='Đội ngũ' />
                        </Form.Item>

                        <Form.Item>
                            <Button size='middle'
                                htmlType='submit'
                                loading={loading}
                                className={clsx('submitBtn', styles.registerBtn)}
                            >
                                Đăng Ký
                            </Button>
                        </Form.Item>
                    </Form>

                    <Flex align='center' justify='center' style={{ width: '100%' }}>
                        <Text>Bạn đã có tài khoản? </Text>
                        <Button type='link' className={styles.linkBtn}>
                            <Link to='/'>
                                Đăng nhập
                            </Link>
                        </Button>
                    </Flex>
                    <Divider className={styles.divider}>Hoặc</Divider>
                </Col>
            </Flex>
        </>
    )
}

export default Register;