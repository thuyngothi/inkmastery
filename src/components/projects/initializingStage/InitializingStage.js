import { useState } from 'react'
import { Button, Col, Divider, Flex, Typography } from 'antd'

import { useSelectedProject } from '../../../App'

import styles from './InitializingStage.module.scss'

const { Title, Text } = Typography

const InitializingStage = () => {
    const { selectedProject, setSelectedProject } = useSelectedProject();

    const startDate = new Date(selectedProject.startDate)
    const expectedEndDate = new Date(selectedProject.expectedEndDate)

    return (
        <>
            <Col xs={24} md={12} lg={7} className={styles.projectDetailImg}>
                <img src={selectedProject.imageDescription}></img>
            </Col>

            <Col xs={24} sm={12} md={12} lg={9} className={styles.generalInfor}>
                <Text>Tên dự án: {selectedProject.projectName}</Text>
                <Text>Ngày Tạo: {` ${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`}</Text>
                <Text>Ngày dự kiến: {` ${expectedEndDate.getDate()}/${expectedEndDate.getMonth() + 1}/${expectedEndDate.getFullYear()}`}</Text>
                <Text>Yêu cầu khách hàng: {selectedProject.requestDescriptionFromCustomer}</Text>
                <Text>Mô tả: {selectedProject.description}</Text>
            </Col>

            <Col xs={24} sm={12} md={24} lg={8} className={styles.mainInfor}>
                <Flex vertical className={styles.userInfor}>
                    <Title level={4}>Thông tin dự án</Title>
                    <Flex wrap>
                        <Col xs={24} md={12} lg={24}>
                            <Flex vertical className={styles.inforItem}>
                                <Text>Người phụ trách: {selectedProject.leader}</Text>
                                <Text>Số điện thoại: {selectedProject.phoneLeader}</Text>
                                <Text>Email: {selectedProject.emailLeader}</Text>
                            </Flex>
                        </Col>
                        <Col xs={24} md={12} lg={24}>
                            <Flex vertical className={styles.inforItem}>
                                <Text>Khách hàng: {selectedProject.customer}</Text>
                                <Text>Số điện thoại: {selectedProject.phoneCustomer}</Text>
                                <Text>Email: {selectedProject.emailCustomer}</Text>
                                <Text>Địa chỉ: {selectedProject.addressCustomer}</Text>
                            </Flex>
                        </Col>
                    </Flex>
                </Flex>

                <Divider style={{ backgroundColor: '#d6d9e485', margin: '0' }}></Divider>
                <Flex justify='space-between' className={styles.price}>
                    <Text>Giá dự án</Text>
                    <Text>{Number(selectedProject.startingPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                </Flex>
            </Col>
        </>
    )
}

export default InitializingStage;