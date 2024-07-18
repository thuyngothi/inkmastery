import { Flex,Typography, Divider, Form, Input, Col, Button } from "antd";
import { useState } from "react";
import clsx from "clsx";

import styles from './Profile.module.scss'

import avatar from '../../assets/images/avatars/avatar-10.png'

const { Title } = Typography
const Infor = ({userInfor}) => {

    const [infor, setInfor] = useState(userInfor);
    return (
        <>
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
                    <Flex justify="space-around" wrap>
                        <Col xs={23} lg={11}>
                            <Form.Item label='Tài khoản'>
                                <Input size="large" name='Username' value={infor.UserName} />
                            </Form.Item>
                        </Col>
                        <Col xs={23} lg={11}>
                            <Form.Item label='Họ và tên'>
                                <Input size="large" name='FullName' value={infor.FullName} />
                            </Form.Item>
                        </Col>
                    </Flex>

                    <Flex justify="space-around" wrap>
                        <Col xs={23} lg={11}>
                            <Form.Item label='Email'>
                                <Input size="large" name='Email' value={infor.Email} />
                            </Form.Item>
                        </Col>
                        <Col xs={23} lg={11}>
                            <Form.Item label='Số điện thoại'>
                                <Input size="large" name='PhoneNumber' value={infor.PhoneNumber} />
                            </Form.Item>
                        </Col>
                    </Flex>

                    <Flex justify="space-around" wrap>
                        <Col xs={23} lg={11}>
                            <Form.Item label='Ngày sinh'>
                                <Input size="large" name='DateOfBirth' />
                            </Form.Item>
                        </Col>
                        <Col xs={23} lg={11}>
                            <Form.Item label='Giới tính'>
                                <Input size="large" name='Gender' />
                            </Form.Item>
                        </Col>
                    </Flex>
                    <Form.Item style={{textAlign:'left', padding:'0 16px'}}>
                        <Button
                            htmlType="submit"
                            size="large"
                            className='submitBtn'
                        >Cập nhật</Button>
                    </Form.Item>
                </Form>
            </Flex>
        </>
    )
}

export default Infor;