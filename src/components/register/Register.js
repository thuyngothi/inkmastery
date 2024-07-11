import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'

import { Flex, Typography, Form, Input, Checkbox, Button, Divider, Space, DatePicker } from 'antd'

import styles from './Register.module.scss'
import login_img from '../../assets/images/pages/auth-v2-register-illustration-dark.png'
import logo from '../../assets/images/logoPrint.png'
const { Title, Text, Paragraph } = Typography

const Register = () => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <Flex className={styles.container}>
                <Space
                    style={{
                        width: '65%',
                        backgroundColor: '#202336',
                        padding: '40px 0'
                    }}>
                    <img style={{ maxWidth: '60%' }} src={login_img}></img>
                </Space>

                <Flex align='flex-start' vertical className={styles.content}>
                    <Flex align='center'>
                        <img src={logo} style={{ width: '20%' }}></img>
                        <Title level={3} style={{color:'#c7cbe3'}}>InkMastery</Title>
                    </Flex>
                    <Form
                        className={styles.formRegister}
                        layout='vertical'
                        wrapperCol={{ span: 24 }}
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <Form.Item
                            label='Tài khoản'
                            name='username'
                            // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input className={styles.inforInput} placeholder='Tài khoản' />
                        </Form.Item>

                        <Form.Item
                            label='Ngày sinh'
                            name='dob'
                            rules={[{ required: true, message: 'Please input your date of birth!' }]}
                            style={{color:'red'}}
                        >
                            <DatePicker className={styles.inforInput} placeholder='yyyy-mm-dd' />
                        </Form.Item>

                        <Form.Item
                            label='Email'
                            name='email'
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input className={styles.inforInput} placeholder='abc123@gmail.com' />
                        </Form.Item>

                        <Form.Item
                            label='Số điện thoại'
                            name='phoneNumber'
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input className={styles.inforInput} placeholder='Tài khoản' />
                        </Form.Item>

                        <Form.Item
                            label='Họ và tên'
                            name='fullname'
                            rules={[{ required: true, message: 'Please input your fullname!' }]}
                        >
                            <Input className={styles.inforInput} placeholder='Nguyễn Văn A' />
                        </Form.Item>

                        <Form.Item
                            label='Mật khẩu'
                            name='password'
                            // rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password className={styles.inforInput} placeholder='Mật khẩu' />
                        </Form.Item>

                        <Form.Item
                            label='Giới tính'
                            name='gender'
                            rules={[{ required: true, message: 'Please input your gender!' }]}
                        >
                            <Input className={styles.inforInput} placeholder='' />
                        </Form.Item>
                        <Form.Item
                            label='Đội ngũ'
                            name='group'
                            rules={[{ required: true, message: 'Please input your group!' }]}
                        >
                            <Input className={styles.inforInput} placeholder='' />
                        </Form.Item>

                        <Form.Item>
                            <Button size='middle'
                                htmlType='submit'
                                loading={loading}
                                className={styles.registerBtn}
                            >
                                Đăng Ký
                            </Button>
                        </Form.Item>
                    </Form>

                    <Divider className={styles.divider}>Hoặc</Divider>
                </Flex>
            </Flex>
        </>
    )
}

export default Register;