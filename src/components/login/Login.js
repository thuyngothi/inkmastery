import { Flex, Typography, Form, Input, Checkbox, Button, Divider } from 'antd'

import styles from './Login.module.scss'

import login_img from '../../assets/images/pages/auth-v2-login-illustration-dark.png'
import logo from '../../assets/images/logoPrint.png'
const { Title, Text, Paragraph } = Typography
const Login = () => {
    return (
        <>
            <Flex className={styles.container}>
                <Flex
                    justify='center'
                    style={{
                        width: '70%',
                        backgroundColor: '#202336',
                        padding: '40px 0'
                    }}>
                    <img style={{ maxWidth: '60%' }} src={login_img}></img>
                </Flex>
                <Flex align='flex-start' vertical className={styles.content}>
                    <img style={{ width: '30%' }} src={logo}></img>
                    <Title style={{ color: '#c7cbe3' }} level={4}>Chào Mừng Đến Với InkMastery!</Title>
                    <Text style={{textAlign:'left'}}>Vui lòng đăng nhập vào tài khoản của bạn và bắt đầu cuộc phiêu lưu</Text>
                    <Form
                        className={styles.formLogin}
                        layout='vertical'
                        wrapperCol={{ span: 24 }}
                    >
                        <Form.Item label='Tài khoản'>
                            <Input placeholder='' />
                        </Form.Item>
                        <Form.Item label='Mật khẩu'>
                            <Input placeholder='' />
                        </Form.Item>
                        <Form.Item>
                            <Flex justify='space-between' align='center'>
                                <Checkbox>Nhớ mật khẩu</Checkbox>
                                <Button className={styles.linkBtn} type='link'>Quên mật khẩu?</Button>
                            </Flex>
                        </Form.Item>
                        <Button size='middle' className={styles.loginBtn}>Đăng Nhập</Button>
                    </Form>
                    <Flex align='center' justify='center' style={{width:'100%'}}>
                        <Text>Bạn chưa có tài khoản? </Text>
                        <Button type='link' className={styles.linkBtn}>Đăng ký tài khoản</Button>
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