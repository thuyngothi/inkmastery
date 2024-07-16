import { Flex,Typography, Divider, Form, Input, Col } from "antd";

import styles from './Profile.module.scss'

const {Title } = Typography
const ChangePass = () => {
    return (
        <>
            <Flex vertical align='flex-start' className={styles.profileInfor}>
                <Flex vertical gap='small' align='flex-start' style={{ padding: '16px' }}>
                    <Title level={4} style={{ color: '#fff' }}>Đổi mật khẩu</Title>
                </Flex>
                <Form style={{ width: '100%' }}
                    wrapperCol={{ span: 24 }}
                    layout="vertical"
                    className={styles.formProfile}
                >
                    <Flex justify="space-around" wrap>
                        <Col xs={23} lg={11}>
                            <Form.Item label='Mật khẩu cũ'>
                                <Input name='Password' />
                            </Form.Item>
                        </Col>
                        <Col xs={23} lg={11}>
                            <Form.Item label='Mật khẩu mới'>
                                <Input name='NewPassword' />
                            </Form.Item>
                        </Col>
                    </Flex>

                </Form>
            </Flex>
        </>
    )
}

export default ChangePass;