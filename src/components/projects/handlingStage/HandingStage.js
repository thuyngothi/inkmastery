import { useEffect, useState } from 'react'
import { Button, Col, Divider, Flex, Form, Input, message, Table, Typography } from 'antd'
import { CalendarOutlined, ArrowRightOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useSelectedProject } from '../../../App'

import styles from './HandingStage.module.scss'
import clsx from 'clsx'

const { Title, Text } = Typography

const HandingStage = ({ handle }) => {
    const token = localStorage.getItem('token')
    const instance = axios.create({
        baseURL: 'https://localhost:44389',
        timeout: 5000,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const { selectedProject } = useSelectedProject()
    const [postData, setPostData] = useState({});

    const [resourceForPrints, setResourceForPrints] = useState([])
    const [resourceProperties, setResourceProperties] = useState([])

    const createdDate = new Date(selectedProject.startDate)

    // Logic get approve design 
    useEffect(() => {
        const approvedDesign = selectedProject.designs.find(item => item.designStatus === 'HasBeenApproved')
        if (approvedDesign) {
            setPostData(prev => ({
                ...prev,
                designId: approvedDesign.id
            }))
        }

        const fetchData = async () => {
            try {
                const response = await instance.get('api/Admin/GetAllResourceType')
                if (response.status === 200) {
                    setResourceProperties(prev => {
                        const stationery = response.data[0].resources.find(item => item.resourceName === 'Văn phòng phẩm')
                        if (stationery) {
                            setResourceProperties(() => {
                                const result = stationery.resourceProperties.map(item => {
                                    return {
                                        id: item.resourcePropertyDetails[0].id,
                                        name: item.resourcePropertyDetails[0].name,
                                        quantity: 0,
                                        inventoryQuantity: item.resourcePropertyDetails[0].quantity
                                    }
                                })
                                return result
                            });

                            // setResourceForPrints(() => {
                            //     const result = stationery.resourceProperties.map(item => {                                 
                            //         return {
                            //             resourcePropertyDetailId: item.resourcePropertyDetails[0].id,
                            //             quantity: 0,
                            //         }
                            //     })                               
                            //     return result
                            // })
                        }
                    })
                }
            } catch (error) {
                console.error('Lỗi: ', error)
            }
        }
        fetchData()

    }, [])

    useEffect(() => {
        if (resourceProperties) {
            const result = resourceProperties.filter(item => item.quantity > 0).map(item => {
                return {
                    resourcePropertyDetailId: item.id,
                    quantity: item.quantity,
                }
            })
            setResourceForPrints(result)
        }
    }, [resourceProperties])

    // Logic Increate quantity
    const handleIncreaseQuantity = (index) => {
        const newData = [...resourceProperties];
        newData[index].quantity += 1;
        setResourceProperties(newData)
    }

    // Logic Decreate quantity
    const handleDecreaseQuantity = (index) => {
        const newData = [...resourceProperties];
        if (newData[index].quantity > 0) {
            newData[index].quantity -= 1;
            setResourceProperties(newData)
        }
    }

    const onQuantityChange = (index, e) => {
        const newData = [...resourceProperties];
        newData[index].quantity = Number(e.target.value);
        setResourceProperties(newData)
    }

    const handlePrint = async() => {
        await setPostData(prev => ({
            ...prev,
            resourceForPrints: [...resourceForPrints]
        }));
        
        if (!resourceForPrints) {
            message.error('Vui lòng chọn tài nguyên để in!');
            return;
        }

        try{
            const response = await instance.post('api/Admin/CreatePrintJob', postData)
            console.log(response)
            if(response.data.status === 200){
                message.success(response.data.message)
                delete(postData.resourceForPrints)
                handle(3)
            }
        }catch(error){
            console.error('Lỗi: ', error)
        }
    }

    return (
        <>
            <Col xs={24} xl={16} className={styles.printInfor}>
                <Form layout='vertical'>
                    <Flex gap='middle' justify='space-between'>
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

                    <Flex gap='middle' justify='space-between'>
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

                    <Flex gap='middle' justify='space-between' wrap>
                        <Form.Item label='Loại máy móc' className={styles.formItem}>
                            <Input
                                name='machine'
                                disabled
                                value='Máy in 3D'
                            />
                        </Form.Item>
                        <Col xs={24} lg={11}>
                            <Flex gap='small' vertical className={styles.formItemResource}>
                                <Flex justify='space-around' style={{ width: '100%' }}>
                                    <Flex style={{ width: '30%' }} justify='center'><Text>TÀI NGUYÊN</Text></Flex>
                                    <Flex style={{ width: '40%' }} justify='center'><Text> SỐ LƯỢNG IN</Text></Flex>
                                    <Flex style={{ width: '30%' }} justify='center'><Text>SỐ LƯỢNG CÒN</Text></Flex>
                                </Flex>

                                {!!resourceProperties &&
                                    resourceProperties.map((item, index) => (
                                        <Flex align='center' justify='space-around' className={styles.setQuantity}>
                                            <Flex style={{ width: '30%' }} justify='center'><Text>{item.name}</Text></Flex>
                                            <Flex style={{ width: '40%' }} justify='center'>
                                                <button className={clsx('submitBtn', styles.decreasingBtn)} onClick={() => handleDecreaseQuantity(index)}>-</button>
                                                <Input value={item.quantity} type='number' onChange={(event) => onQuantityChange(index, event)} />
                                                <button className={clsx('submitBtn', styles.increasingBtn)} onClick={() => handleIncreaseQuantity(index)}>+</button>
                                            </Flex>
                                            <Flex style={{ width: '30%' }} justify='center'><Text>{item.inventoryQuantity}</Text></Flex>
                                        </Flex>
                                    ))
                                }
                            </Flex>
                        </Col>
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
                <Flex justify='flex-end'>
                    <Button className={clsx('submitBtn', styles.printBtn)}
                        onClick={handlePrint}
                    >
                        Bắt đầu in {<ArrowRightOutlined />}
                    </Button>
                </Flex>
            </Col>
        </>
    )
}

export default HandingStage;