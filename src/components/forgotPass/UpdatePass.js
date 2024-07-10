import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

import { Flex, Typography, Form, Input, Checkbox, Button, Divider, message, Space } from 'antd'

import styles from './ForgotPass.module.scss'
import forpass_img from '../../assets/images/pages/auth-v2-forgot-password-illustration-dark.png'
import logo from '../../assets/images/logoPrint.png'
const { Title, Text } = Typography

const UpdatePass = () => {
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

                <Flex align='flex-start' vertical className={styles.content}>
                    <img style={{ width: '40%' }} src={logo}></img>
                    <Title style={{ color: '#c7cbe3' }} level={4}>Cập nhật mật khẩu mới</Title>
                    <Text>Vui lòng kiểm tra email để lấy mã xác minh</Text>
                    <Text>Thời gian còn lại: <span style={{color:'yellow'}}>X </span>giây</Text>
                    <Form
                        className={styles.formContainer}
                        layout='vertical'
                        wrapperCol={{ span: 24 }}
                    // onFinish={onFinish}
                    >
                        <Form.Item
                            label='Mã xác minh'
                            name='verifyCode'
                            rules={[{ required: true, message: 'Please input verify code!' }]}
                        >
                            <Input className={styles.userInput} placeholder='----' />
                        </Form.Item>

                        <Form.Item
                            label='Mật khẩu mới'
                            name='password'
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input className={styles.userInput} placeholder='Password' />
                        </Form.Item>

                        <Form.Item
                            label='Nhập lại mật khẩu'
                            name='confirmPass'
                            rules={[{ required: true, message: 'Please input confirm password!' }]}
                        >
                            <Input className={styles.userInput} placeholder='Confirm password' />
                        </Form.Item>

                        <Form.Item>
                            <Button size='middle'
                                htmlType='submit'
                                // loading={loading}
                                className={styles.submitBtn}
                            >
                                Xác Nhận
                            </Button>
                        </Form.Item>
                    </Form>

                    <Button type='link' className={styles.linkBtn} style={{margin:'0 auto'}}>
                        <Link to='/forgotPassword'>
                            Quay lại quên mật khẩu
                        </Link>
                    </Button>
                </Flex>
            </Flex>
        </>
    )
}

export default UpdatePass;