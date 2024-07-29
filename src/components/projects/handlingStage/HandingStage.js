import { useState } from 'react'
import { Button, Col, Divider, Flex, Form, Input, Typography } from 'antd'
import { useSelectedProject } from '../../../App'

import styles from './HandingStage.module.scss'

const { Title, Text } = Typography
const HandingStage = () => {
    const { selectedProject } = useSelectedProject()
    const [ displayData, setDisplayData ] = useState({});

    return (
        <>
            <Col xs={24} lg={16} className={styles.projectDetail}>
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
                                name='createDate'
                                disabled
                                value={selectedProject.createdDate}
                            />
                        </Form.Item>
                    </Flex>

                    <Flex gap='middle'>
                        <Form.Item label='Loại máy móc' className={styles.formItem}>
                            <Input
                                name='machine'
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

            <Col xs={24} lg={8} className={styles.mainInfor}>

            </Col>
        </>
    )
}

export default HandingStage;