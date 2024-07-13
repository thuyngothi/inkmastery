import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Flex, Button, Typography, Divider, Form, Input, Row } from "antd";
import { useEffect, useState } from "react";
import clsx from "clsx";
import axios from "axios";

import styles from './Profile.module.scss'

import avatar from '../../assets/images/avatars/avatar-10.png'

const { Title } = Typography
const Profile = () => {
    const [focus, setFocus] = useState('profile')
    useEffect(() => {
        if (focus === 'profile') {
            // const response = async axios.get('')
        }
    }, [focus])

    const callProfile = () => {
        setFocus('profile')
    }

    const changePass = () => {
        setFocus('changePass')
    }

    return (
        <>
            <Flex vertical gap='middle' className={styles.profileContainer}>
                <Flex gap='large'>
                    <Button size="large"
                        value='profile'
                        className={clsx(styles.btn, styles.profileBtn, { [styles.active]: focus === 'profile' })}
                        icon={<UserOutlined />}
                        onClick={callProfile}
                    >
                        Tài khoản
                    </Button>

                    <Button size="large"
                        value='changePass'
                        className={clsx(styles.btn, styles.profileBtn, { [styles.active]: focus === 'changePass' })}
                        icon={<LockOutlined />}
                        onClick={changePass}
                    >
                        Đổi Mật Khẩu
                    </Button>
                </Flex>

                <Flex vertical align='flex-start' className={styles.profileInfor}>
                    <Flex vertical gap='small' align='flex-start' style={{ padding: '16px' }}>
                        <Title level={4} style={{ color: '#fff' }}>Thông tin cá nhân</Title>
                        <Flex>
                            <img src={avatar}></img>
                        </Flex>
                    </Flex>
                    <Divider style={{ backgroundColor: '#686d8a', margin: '16px 0' }} />
                    <Form style={{ width: '100%' }}
                        wrapperCol={{ span: 24 }}
                        layout="vertical"
                        className={styles.formProfile}
                    >
                        <Flex justify="space-around">
                            <Form.Item style={{width:'45%'}} label='Tài khoản'>
                                <Input name='Username' />
                            </Form.Item>
                            <Form.Item style={{width:'45%'}} label='Họ và tên'>
                                <Input name='FullName' />
                            </Form.Item>
                        </Flex>
                        <Flex justify="space-around">
                            <Form.Item style={{width:'45%'}} label='Tài khoản'>
                                <Input name='Username' />
                            </Form.Item>
                            <Form.Item style={{width:'45%'}} label='Họ và tên'>
                                <Input name='FullName' />
                            </Form.Item>
                        </Flex>
                    </Form>
                </Flex>
            </Flex>
        </>
    )
}

export default Profile;