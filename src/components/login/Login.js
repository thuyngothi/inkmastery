import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

import { Flex, Typography, Form, Input, Checkbox, Button, Divider, message, Space } from 'antd'

import styles from './Login.module.scss'
import login_img from '../../assets/images/pages/auth-v2-login-illustration-dark.png'
import logo from '../../assets/images/logoPrint.png'
const { Title, Text } = Typography
const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const onFinish = async (values) => {
        setLoading(true)
        try {
            const response = await axios.post('https://localhost:44389/api/Auth/Login', values)
            console.log(response);
            
            if(response && response.status === 200){
                const res = response.data;

                if(!localStorage.getItem("accessToken")){
                    console.log(localStorage.getItem("accessToken"));
                    localStorage.setItem("token", res.accessToken);
                    localStorage.setItem("refresh", res.refreshToken);
                }
            }

            navigate('/home');
        } catch (error) {
            console.error(error);
            message.error('login failed!');
        }
        setLoading(false);
    };

    return (
        <>
            <Flex className={styles.container}>
                <Space
                    justify='center'
                    style={{
                        width: '65%',
                        backgroundColor: '#202336',
                        padding: '40px 0'
                    }}>
                    <img style={{ maxWidth: '60%' }} src={login_img}></img>
                </Space>

                <Flex align='flex-start' vertical className={styles.content}>
                    <img style={{ width: '30%' }} src={logo}></img>
                    <Title style={{ color: '#c7cbe3' }} level={4}>Chào Mừng Đến Với InkMastery!</Title>
                    <Text style={{ textAlign: 'left' }}>Vui lòng đăng nhập vào tài khoản của bạn và bắt đầu cuộc phiêu lưu</Text>
                    <Form
                        className={styles.formLogin}
                        layout='vertical'
                        wrapperCol={{ span: 24 }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label='Tài khoản'
                            name='username'
                            // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input className={styles.userInput} placeholder='Tài khoản' />
                        </Form.Item>
                        <Form.Item
                            label='Mật khẩu'
                            name='password'
                            // rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password className={styles.userInput} placeholder='Mật khẩu' />
                        </Form.Item>

                        <Flex justify='space-between'>
                            <Form.Item
                                name='remember'
                                valuePropName='checked'
                            >
                                <Checkbox>Nhớ mật khẩu</Checkbox>
                            </Form.Item>
                            <Link to='/forgotPassword'>
                                <Button
                                    className={styles.linkBtn}
                                    type='link'
                                >
                                    Quên mật khẩu?
                                </Button>
                            </Link>
                        </Flex>

                        <Form.Item>
                            <Button size='middle'
                                htmlType='submit'
                                loading={loading}
                                className={styles.loginBtn}
                            >
                                Đăng Nhập
                            </Button>
                        </Form.Item>
                    </Form>

                    <Flex align='center' justify='center' style={{ width: '100%' }}>
                        <Text>Bạn chưa có tài khoản? </Text>
                        <Button type='link' className={styles.linkBtn}>
                            <Link to='/register'>
                                Đăng ký tài khoản
                            </Link>
                        </Button>
                    </Flex>
                    <Divider className={styles.divider}>Hoặc</Divider>
                    <Flex>

                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default Login;