import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

import { Flex, Typography, Form, Input, Checkbox, Button, Divider, message, Space } from 'antd'

import styles from './ForgotPass.module.scss'
import forpass_img from '../../assets/images/pages/auth-v2-forgot-password-illustration-dark.png'
import logo from '../../assets/images/logoPrint.png'
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
        }

        setLoading(false);
    }
    //$2a$11$rGApX9bDrReF6O1ZTiSgJ.FOMirzGjDLobUGufhbMciez61m4CEjC

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
                    <img style={{ maxWidth: '60%' }} src={forpass_img}></img>
                </Space>

                <Flex justify='center' align='flex-start' vertical className={styles.content}>
                    <img style={{ width: '40%' }} src={logo}></img>
                    <Title style={{ color: '#c7cbe3' }} level={4}>Quên mật khẩu?</Title>
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
                                className={styles.submitBtn}
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
                </Flex>
            </Flex>
        </>
    )
}

export default ForgetPass;