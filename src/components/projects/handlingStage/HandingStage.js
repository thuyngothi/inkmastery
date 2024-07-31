import { useState } from 'react'
import { Button, Col, Divider, Flex, Form, Input, Typography } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import { useSelectedProject } from '../../../App'

import styles from './HandingStage.module.scss'

const { Title, Text } = Typography
const HandingStage = () => {
    const { selectedProject } = useSelectedProject()
    const [displayData, setDisplayData] = useState({});

    const createdDate = new Date(selectedProject.startDate)
    return (
        <>
            <Col xs={24} xl={16} className={styles.printInfor}>
                <Form layout='vertical'>
                    <Flex gap='middle'>
                        <Form.Item label='Mã đơn hàng' className={styles.formItem}>
                            <Input
                                name='projectId'
                                disabled
                                value={selectedProject.id}
                            />
                        </Form.Item>
                        <Form.Item label='Tên đơn hàng' className={styles.formItem}>
                            <Input
                                name='projectName'
                                disabled
                                value={selectedProject.projectName}
                            />
                        </Form.Item>
                    </Flex>

                    <Flex gap='middle'>
                        <Form.Item label='Quản lý' className={styles.formItem}>
                            <Input
                                name='leader'
                                disabled
                                value={selectedProject.leader}
                            />
                        </Form.Item>
                        <Form.Item label='Ngày đặt' className={styles.formItem}>
                            <Input
                                className={styles.createdDate}
                                prefix={<CalendarOutlined />}
                                name='createDate'
                                disabled
                                value={` ${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`}
                            />
                        </Form.Item>
                    </Flex>

                    <Flex gap='middle'>
                        <Form.Item label='Loại máy móc' className={styles.formItem}>
                            <Input
                                name='machine'
                                disabled
                                value='Máy in 3D'
                            />
                        </Form.Item>
                        <Form.Item label='TÀI NGUYÊN' className={styles.formItem}>
                            <Input
                                name='printResource'
                            />
                        </Form.Item>
                    </Flex>
                </Form>
            </Col>

            <Col xs={24} xl={8}>
                <Flex vertical className={styles.mainInforContainer}>
                    <Flex vertical className={styles.mainInfor}>
                        <Title level={4}>Thông tin dự án</Title>
                        <Flex>
                            <Col xs={24}>
                                <Flex wrap>
                                    <Col sm={12} xl={24}>
                                        <img className={styles.projectImg} src={selectedProject.imageDescription}></img>
                                    </Col>
                                    <Col sm={12} xl={24}>
                                        <Flex justify='space-between' className={styles.price}>
                                            <Text>Giá dự án</Text>
                                            <Text>{Number(selectedProject.startingPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                                        </Flex>
                                        <Flex justify='space-between'>
                                            <Text>Tên dự án: </Text>
                                            <Text>{selectedProject.projectName}</Text>
                                        </Flex>
                                    </Col>
                                </Flex>
                            </Col>
                        </Flex>
                    </Flex>
                    <Divider style={{ backgroundColor: '#d6d9e485', margin: '0' }}></Divider>
                    <Flex align='center' justify='space-between' className={styles.totalPrice}>
                        <Text>Thành tiền: </Text>
                        <Text>{Number(selectedProject.startingPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                    </Flex>
                </Flex>

            </Col>
        </>
    )
}

export default HandingStage;