import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

import { Flex, Typography, Form, Input, Button, Divider, message, Space, Col } from 'antd'

import styles from './ForgotPass.module.scss'
import forpass_img from '../../assets/images/pages/auth-v2-forgot-password-illustration-dark.png'
import logo from '../../assets/images/logoPrint.png'
import clsx from 'clsx'
const { Title, Text } = Typography

const ForgetPass = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [email, setEmail] = useState('');

    const onFinish = async (values) => {
        setLoading(true)
        try {
            const response = await axios.post(`https://localhost:44389/api/Auth/ForgotPassword?email=${email}`)
            navigate('/updatePassword')
        } catch (error) {
            console.error('Lỗi: ', error);
            message.error('Update failed!');
        }

        setLoading(false);
    }

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

                <Col xs={24} lg={10} xl={8} justify='center' className={styles.content}>
                    <Flex vertical align='flex-start'>
                        <img style={{ width: '40%' }} src={logo}></img>
                        <Title style={{ color: '#c7cbe3' }} level={4}>Quên mật khẩu?</Title>
                    </Flex>
                    <Form
                        className={styles.formContainer}
                        layout='vertical'
                        wrapperCol={{ span: 24 }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label='Email'
                            required
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.userInput} placeholder='Email' />
                        </Form.Item>

                        <Form.Item>
                            <Button size='middle'
                                htmlType='submit'
                                loading={loading}
                                className={clsx('submitBtn', styles.submitBtn)}
                            >
                                Xác Nhận
                            </Button>
                        </Form.Item>
                    </Form>

                    <Button type='link' className={styles.linkBtn} style={{ margin: '0 auto' }}>
                        <Link to='/'>
                            Quay lại đăng nhập
                        </Link>
                    </Button>
                </Col>
            </Flex>
        </>
    )
}

export default ForgetPass;