import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

import { Flex, Typography, Form, Input, Checkbox, Button, Divider, message, Space, Col } from 'antd'

import styles from './ForgotPass.module.scss'
import forpass_img from '../../assets/images/pages/auth-v2-forgot-password-illustration-dark.png'
import logo from '../../assets/images/logoPrint.png'
import clsx from 'clsx'
const { Title, Text } = Typography

const UpdatePass = () => {
    const [countdown, setCountdown] = useState(60)
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        confirmCode: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (countdown > 0) {
            const timerId = setInterval(() => setCountdown(prev => prev - 1), 1000)

            return () => clearInterval(timerId)
        }
    }, [countdown])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        const { confirmCode, password, confirmPassword } = formData;

        // Validation
        let newErrors = {};
        if (!confirmCode) newErrors.confirmCode = 'Please input your confirmation code!';
        if (!password) newErrors.password = 'Please input your new password!';
        if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your new password!';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match!';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log(formData);
        try {
            const response = await axios.put('https://localhost:44389/api/Auth/ConfirmCreateNewPassword', formData);
            message.success('Password update successful!');
            console.log('Password update successful:', response.data);
            navigate('/')
        } catch (error) {
            message.error('Password update failed!');
            console.error('Password update failed:', error);
        }
    };


    return (
        <>
            <Flex className={styles.container} wrap>
                <Col xs={24} lg={14} xl={16}
                    justify='center'
                    style={{
                        width: '65%',
                        backgroundColor: '#202336',
                        padding: '40px 0'
                    }}>
                    <img style={{ maxWidth: '60%' }} src={forpass_img}></img>
                </Col>

                <Col xs={24} lg={10} xl={8} align='flex-start' className={styles.content}>
                    <Flex vertical align='flex-start'>
                        <img style={{ width: '40%' }} src={logo}></img>
                        <Title style={{ color: '#c7cbe3' }} level={4}>Cập nhật mật khẩu mới</Title>
                        <Text>Vui lòng kiểm tra email để lấy mã xác minh</Text>
                        <Text>Thời gian còn lại: <span style={{ color: 'yellow' }}>{countdown} </span>giây</Text>
                    </Flex>

                    <Form
                        className={styles.formContainer}
                        layout='vertical'
                        wrapperCol={{ span: 24 }}
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            label='Mã xác minh'
                            validateStatus={errors.confirmCode ? 'error' : ''}
                            help={errors.confirmCode || ''}
                        >
                            <Input
                                name='confirmCode'
                                className={styles.userInput} placeholder='----'
                                value={formData.confirmCode}
                                onChange={handleChange}
                            />
                        </Form.Item>

                        <Form.Item
                            label='Mật khẩu mới'
                            validateStatus={errors.password ? 'error' : ''}
                            help={errors.password || ''}
                        //rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input
                                name='password'
                                className={styles.userInput} placeholder='Password'
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Form.Item>

                        <Form.Item
                            label='Nhập lại mật khẩu'
                            validateStatus={errors.confirmPassword ? 'error' : ''}
                            help={errors.confirmPassword || ''}
                        //rules={[{ required: true, message: 'Please input confirm password!' }]}
                        >
                            <Input
                                name='confirmPassword'
                                className={styles.userInput} placeholder='Confirm password'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button size='middle'
                                htmlType='submit'
                                // loading={loading}
                                className={clsx('submitBtn', styles.submitBtn)}
                            >
                                Xác Nhận
                            </Button>
                        </Form.Item>
                    </Form>

                    <Button type='link' className={styles.linkBtn} style={{ margin: '0 auto' }}>
                        <Link to='/forgotPassword'>
                            Quay lại quên mật khẩu
                        </Link>
                    </Button>
                </Col>
            </Flex>
        </>
    )
}

export default UpdatePass;