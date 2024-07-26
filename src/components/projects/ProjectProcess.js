import { useState } from 'react'
import { Button, Col, Divider, Flex, Typography } from 'antd'
import { CloseOutlined, FundProjectionScreenOutlined, RightOutlined, FileImageOutlined, FileDoneOutlined, DeliveredProcedureOutlined } from '@ant-design/icons'
import { useSelectedProject } from '../../App'

import initialization from '../../assets/images/iconify-svg/trending.svg'
import design from '../../assets/images/iconify-svg/address.svg'
import handle from '../../assets/images/iconify-svg/payment.svg'
import delivery from '../../assets/images/iconify-svg/cart.svg'

import styles from './Project.module.scss'
import clsx from 'clsx'

const { Title, Text } = Typography
const ProjectProcess = () => {
    const { selectedProject, setSelectedProject } = useSelectedProject();

    const startDate = new Date(selectedProject.startDate)
    const expectedEndDate = new Date(selectedProject.expectedEndDate)

    return (
        <>
            <Flex vertical className={styles.projectProcess}>
                <Flex align='center' justify='space-between' style={{ width: '100%', padding: '16px' }}>
                    <Title style={{ marginBottom: '0' }} level={3}>Tên dự án: {selectedProject.projectName}</Title>
                    <button className={styles.closeBtn}>{<CloseOutlined />}</button>
                </Flex>

                <Flex justify='center' gap='middle' className={styles.navMenu}>
                    <Flex gap='middle' align='center' vertical className={styles.iconStage}>
                        {<FundProjectionScreenOutlined />}
                        <Text>Dự án</Text>
                    </Flex>
                    <Flex gap='middle'>
                        {<RightOutlined />}
                        <Flex gap='middle' align='center' vertical className={styles.iconStage}>
                            {<FileImageOutlined />}
                            <Text>Thiết kế</Text>
                        </Flex>
                    </Flex>
                    <Flex gap='middle'>
                        {<RightOutlined />}
                        <Flex gap='middle' align='center' vertical className={styles.iconStage}>
                            {<FileDoneOutlined />}
                            <Text>In ấn</Text>
                        </Flex>
                    </Flex>
                    <Flex gap='middle'>
                        {<RightOutlined />}
                        <Flex gap='middle' align='center' vertical className={styles.iconStage}>
                            {<DeliveredProcedureOutlined />}
                            <Text>Giao hàng</Text>
                        </Flex>
                    </Flex>

                </Flex>
                <Divider style={{ backgroundColor: '#d6d9e485', margin: '0' }}></Divider>

                <Flex wrap className={styles.stageContent}>
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
                </Flex>
            </Flex>

        </>
    )
}

export default ProjectProcess;