import { Flex,Typography, Divider, Form, Input, Col } from "antd";

import styles from './Profile.module.scss'

import avatar from '../../assets/images/avatars/avatar-10.png'

const { Title } = Typography
const Infor = ({userInfor}) => {
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
                                <Input name='Username' value={userInfor.UserName} />
                            </Form.Item>
                        </Col>
                        <Col xs={23} lg={11}>
                            <Form.Item label='Họ và tên'>
                                <Input name='FullName' value={userInfor.FullName} />
                            </Form.Item>
                        </Col>
                    </Flex>

                    <Flex justify="space-around" wrap>
                        <Col xs={23} lg={11}>
                            <Form.Item label='Email'>
                                <Input name='Email' value={userInfor.Email} />
                            </Form.Item>
                        </Col>
                        <Col xs={23} lg={11}>
                            <Form.Item label='Số điện thoại'>
                                <Input name='PhoneNumber' value={userInfor.PhoneNumber} />
                            </Form.Item>
                        </Col>
                    </Flex>

                    <Flex justify="space-around" wrap>
                        <Col xs={23} lg={11}>
                            <Form.Item label='Ngày sinh'>
                                <Input name='DateOfBirth' />
                            </Form.Item>
                        </Col>
                        <Col xs={23} lg={11}>
                            <Form.Item label='Giới tính'>
                                <Input name='Gender' />
                            </Form.Item>
                        </Col>
                    </Flex>
                </Form>
            </Flex>
        </>
    )
}

export default Infor;