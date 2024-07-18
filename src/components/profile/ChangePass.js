import { useState } from "react";
import { Flex, Typography, Divider, Form, Input, Col, Button, message } from "antd";

import styles from './Profile.module.scss'
import axios from "axios";

const { Title } = Typography
const ChangePass = () => {
    const [error, setError] = useState({})
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target)
        console.log('name:', name);
        console.log('value:', value);
        setFormData(predata => ({
            ...predata,
            [name]: value,
        }))
        if(!error[name]){
            setError(prevdata => (
                {...prevdata, [name]:''}
            ))
        }
    }

    const handleSubmit = async() => {
        const { oldPassword, newPassword, confirmPassword } = formData;
        let errors = {}
        if (!oldPassword) errors.oldPassword = 'Vui lòng nhập vào mật khẩu hiện tại!'
        if (!newPassword) errors.newPassword = 'Vui lòng nhập vào mật khẩu mới!'
        if (!confirmPassword) errors.confirmPassword = 'Vui lòng nhập lại mật khẩu mới!'
        if (newPassword !== confirmPassword) errors.confirmPassword = 'Vui lòng nhập lại mật khẩu trùng khớp!'

        if (Object.values(errors).length > 0) {
            setError(errors);
            return;
        }

        const token = localStorage.getItem('token')
        try {
            const instance = axios.create({
                baseURL: 'https://localhost:44389',
                timeout: 5000,
                headers: {'Authorization': `Bearer ${token}`}
            });
            
            const response = await instance.put('api/Auth/ChangePassword', formData);
            console.log(response)

            if (response && response.status === 200) {
                message.success('Change password successful')
                setFormData({
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                })
            } else message.error('There is an error takes place!')

        } catch(error) {
            message.error('Change password failed!');
            console.log('Error: ', error)
        }
    }

    const handleRefresh = () => {
        setFormData({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        })
    }

    return (
        <>
            <Flex vertical align='flex-start' className={styles.profileInfor}>
                <Flex vertical gap='small' align='flex-start' style={{ padding: '0 16px' }}>
                    <Title level={4} style={{ color: '#fff' }}>Đổi mật khẩu</Title>
                </Flex>
                <Form style={{ width: '100%' }}
                    wrapperCol={{ span: 24 }}
                    layout="vertical"
                    className={styles.formProfile}
                    onFinish={handleSubmit}
                >
                    <Flex style={{ paddingLeft: '16px' }} justify="flex-start" wrap>
                        <Col xs={23} lg={11}>
                            <Form.Item label='Mật khẩu cũ'
                                validateStatus={error.oldPassword ? 'error' : ''}
                                help={error.oldPassword || ''}
                            >
                                <Input.Password className="userInput" size="large" 
                                    name='oldPassword'
                                    value={formData.oldPassword}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            {/* <Form.Item
                                label='Mật khẩu' required
                                validateStatus={error.oldPassword ? 'error' : ''}
                                help={error.oldPassword || ''}
                            >
                                <Input.Password
                                    name='oldPassword'
                                    value={formData.oldPassword} onChange={handleChange}
                                    className='userInput'
                                    placeholder='Mật khẩu' />
                            </Form.Item> */}
                        </Col>
                    </Flex>

                    <Flex justify="space-around" wrap>
                        <Col xs={23} lg={11}>
                            <Form.Item label='Mật khẩu mới'
                                validateStatus={error.newPassword ? 'error' : ''}
                                help={error.newPassword || ''}
                            >
                                <Input.Password className="userInput" size="large"
                                    name='newPassword'
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={23} lg={11}>
                            <Form.Item label='Nhập lại mật khẩu'
                                validateStatus={error.confirmPassword ? 'error' : ''}
                                help={error.confirmPassword || ''}
                            >
                                <Input.Password className="userInput" size="large"
                                    name='confirmPassword'
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </Form.Item>

                        </Col>
                    </Flex>

                    <Flex style={{ paddingLeft: '16px' }} gap='middle'>
                        <Button htmlType="submit" size="large" className="submitBtn">Cập nhật</Button>
                        <Button size="large" className={styles.refreshBtn}
                            onClick={handleRefresh}
                        >
                            Làm mới
                        </Button>
                    </Flex>
                </Form>
            </Flex>
        </>
    )
}

export default ChangePass;