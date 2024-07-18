import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment';

import { Flex, Typography, Form, Input, Button, Divider, Space, DatePicker, message, Col } from 'antd'

import styles from './Register.module.scss'
import login_img from '../../assets/images/pages/auth-v2-register-illustration-dark.png'
import logo from '../../assets/images/logoPrint.png'
import clsx from 'clsx';
const { Title, Text, Paragraph } = Typography

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleDateChange = (date, dateString) => {
        setData((prevFormData) => ({
            ...prevFormData,
            DateOfBirth: date ? moment(date).toISOString() : null
        }));
    };

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
        console.log(formData)

        const { Username, Email, Password, FullName, PhoneNumber } = data;

        // Validation
        let newErrors = {};
        if (!Username) newErrors.Username = 'Please input Username!';
        if (!Email) newErrors.Email = 'Please input Email!';
        if (!Password) newErrors.Password = 'Please input your password!';
        if (!FullName) newErrors.FullName = 'Please input your FullName!';
        if (!PhoneNumber) newErrors.PhoneNumber = 'Please input your Phone number!';

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
                        // rules={[{ required: true, message: 'Vui lòng nhập vào tên tài khoản!' }]}
                        >
                            <Input
                                name='Username'
                                // {...register('Username', { required: 'Vui lòng nhập vào tên tại khoản!' })}
                                value={data.Username}
                                onChange={handleChange}
                                className={styles.inforInput}
                                placeholder='Tài khoản'
                            />
                        </Form.Item>

                        <Form.Item
                            label='Email' required
                            validateStatus={errors.Email ? 'error' : ''}
                            help={errors.Email || ''}
                        >
                            <Input
                                name='Email'
                                value={data.Email} onChange={handleChange} type="email"
                                className={styles.inforInput}
                                placeholder='abc123@gmail.com'
                            />
                        </Form.Item>

                        <Form.Item
                            label='Mật khẩu' required
                            validateStatus={errors.Password ? 'error' : ''}
                            help={errors.Password || ''}
                        >
                            <Input.Password
                                name='Password'
                                value={data.Password} onChange={handleChange}
                                //{...register('Password', { required: 'VUi lòng nhập vào mật khẩu!' })}
                                className={styles.inforInput}
                                placeholder='Mật khẩu' />
                        </Form.Item>

                        <Form.Item
                            label='Họ và tên' required
                            validateStatus={errors.FullName ? 'error' : ''}
                            help={errors.FullName || ''}
                        >
                            <Input
                                name='FullName'
                                value={data.FullName} onChange={handleChange}
                                //{...register('FullName', { required: 'Vui lòng nhập vào họ tên!' })}
                                className={styles.inforInput} placeholder='Nguyễn Văn A' />
                        </Form.Item>

                        <Form.Item
                            label='Số điện thoại' required
                            validateStatus={errors.PhoneNumber ? 'error' : ''}
                            help={errors.PhoneNumber || ''}
                        >
                            <Input
                                name='PhoneNumber'
                                value={data.PhoneNumber} onChange={handleChange}
                                //{...register('PhoneNumber', { required: 'Vui lòng nhập vào số điện thoại!' })}
                                className={styles.inforInput} placeholder='Tài khoản' />
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
                            <Input
                                //{...register('Gender')}
                                name='Gender'
                                value={data.Gender}
                                onChange={handleChange}
                                className={styles.inforInput} placeholder='Giới tính' />
                        </Form.Item>
                        <Form.Item
                            label='Đội ngũ'
                        >
                            <Input
                                //{...register('TeamId')}
                                name='TeamId'
                                value={data.TeamId} onChange={handleChange}
                                className={styles.inforInput} placeholder='Đội ngũ' />
                        </Form.Item>

                        <Form.Item>
                            <Button size='middle'
                                htmlType='submit'
                                loading={loading}
                                className={clsx('submitBtn',styles.registerBtn)}
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