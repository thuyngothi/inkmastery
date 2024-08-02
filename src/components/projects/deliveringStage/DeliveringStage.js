import { useState, useEffect } from 'react'
import { Button, Col, Divider, Flex, Modal, Typography, Form, DatePicker, Select, message } from 'antd'
import axios from 'axios'
import clsx from 'clsx'
import moment from 'moment';


import styles from './DeliveringStage.module.scss'
import { useSelectedProject } from '../../../App'
import FormItem from 'antd/es/form/FormItem'

const { Title, Text } = Typography

const DeliveringStage = () => {
    const token = localStorage.getItem('token')
    const instance = axios.create({
        baseURL: 'https://localhost:44389',
        timeout: 5000,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const { selectedProject } = useSelectedProject()

    const [isOpenDelivery, setIsOpenDelivery] = useState(false)
    const [shippers, setShippers] = useState([])
    const [valueDate, setValueDate] = useState()
    const [postData, setPostData] = useState({})

    //Logic get all shippers
    useEffect(() => {
        const fetchData = async () => {
            const response = await instance.get('api/User/GetAllUsers')
            if (response.status === 200) {
                const listShippers = response.data.filter(item => item.teamName === 'Delivery')
                setShippers(() => {
                    return listShippers.map(item => ({
                        label: item.fullName,
                        value: item.id
                    }))
                });
            }
        }
        fetchData()
    }, [])

    const handleOpenDelivery = () => {
        setIsOpenDelivery(true)
        setPostData({
            shippingMethodId: '5D2439C1-D63D-4CC0-86C6-8F65D9C25F5A',
            customerId: selectedProject.customerId,
            projectId: selectedProject.id,
        })
    }

    const handleCloseDelivery = () => {
        setIsOpenDelivery(false)
        setPostData({})
        setValueDate('');
    }

    const onChangeShipper = (value) => {
        setPostData(prev => ({
            ...prev,
            deliverId: value,
        }))
    }
    const onDateChange = (date) => {
        console.log(moment(date).toISOString())
        setPostData(prev => ({
            ...prev,
            estimateDeliveryTime: moment(date).toISOString()
        }))
        setValueDate(date)
    }

    const handleCreateDelivery = async() => {
        try{
            const response = await instance.post('api/Admin/CreateDelivery', postData)
            console.log(response)
            if(response.data.status === 200){
                message.success('Đã gửi đơn hàng cho shipper!')
                setPostData({})
                setIsOpenDelivery(false)
            }else{
                message.error(response.data.message)
            }
        }catch(error){
            console.error('Lỗi: ', error)
        }
    }

    return (
        <>
            <Col xs={24} xl={16} className={styles.inforDelivery}>
                <Flex vertical className={styles.announce}>
                    <Title level={4}>Đơn hàng đã tạo thành công</Title>
                    <Text> Đơn hàng sẽ được giao cho nhân viên giao hàng</Text>
                </Flex>
                <Flex gap='small' vertical className={styles.formDelivery}>
                    <Flex justify='space-around' style={{ width: '100%' }}>
                        <Flex style={{ width: '30%' }}><Text>TÊN ĐƠN HÀNG</Text></Flex>
                        <Flex style={{ width: '20%' }}><Text> KHÁCH HÀNG</Text></Flex>
                        <Flex style={{ width: '20%' }}><Text>ĐỊA CHỈ</Text></Flex>
                        <Flex style={{ width: '20%' }}><Text>TAO TÁC</Text></Flex>
                    </Flex>

                    <Flex align='center' justify='space-around' className={styles.setDelivery}>
                        <Flex style={{ width: '30%' }}><Text>{selectedProject.projectName}</Text></Flex>
                        <Flex style={{ width: '20%' }}><Text>{selectedProject.customer}</Text></Flex>
                        <Flex style={{ width: '20%' }}><Text>{selectedProject.addressCustomer}</Text></Flex>
                        <Flex style={{ width: '20%' }}>
                            <Button className='submitBtn'
                                onClick={handleOpenDelivery}
                            >
                                Giao hàng
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Col>

            <Modal
                open={isOpenDelivery}
                footer={null}
                onCancel={handleCloseDelivery}
            >
                <Flex vertical>
                    <Title level={4}>Giao hàng</Title>
                    <Form
                        layout='vertical'
                        style={{
                            paddingBottom: '0px'
                        }}
                        onFinish={handleCreateDelivery}
                    >
                        <FormItem
                            label='Ngày dự kiến giao hàng'
                            required
                        >
                            <DatePicker name=''
                                className={styles.inforInput}
                                onChange={onDateChange}
                                value={valueDate}
                            />
                        </FormItem>
                        <Form.Item
                            label='Nhân viên giao hàng'
                            required
                        >
                            <Select value={postData.deliverId} onChange={onChangeShipper} options={shippers} />
                        </Form.Item>

                        <Form.Item>
                            <Flex gap='middle' justify="flex-end" className={styles.modalBtns}>
                                <Button className={clsx('submitBtn', styles.updateBtn)} htmlType="submit" type="primary">Gửi</Button>
                                <Button className="modal-cancelBtn"
                                    onClick={handleCloseDelivery}
                                >
                                    Thoát
                                </Button>
                            </Flex>
                        </Form.Item>
                    </Form>
                </Flex>
            </Modal>

            <Col xs={24} xl={8}>
                <Flex vertical className={styles.mainInfor}>
                    <Title level={4}>Thông tin dự án</Title>
                    <Flex wrap>
                        <Col xs={24} md={12} lg={24} style={{ padding: '12px 16px' }}>
                            <Flex vertical className={styles.inforItem}>
                                <Text>Mã đơn hàng: {selectedProject.id}</Text>
                                <Text>Tên đơn hàng: {selectedProject.projectName}</Text>
                            </Flex>
                        </Col>
                        <Divider style={{ backgroundColor: '#d6d9e485', margin: '0' }}></Divider>

                        <Col xs={24} md={12} lg={24} style={{ padding: '12px 16px' }}>
                            <Flex vertical className={styles.inforItem}>
                                <Text>Khách hàng: {selectedProject.customer}</Text>
                                <Text>Số điện thoại: {selectedProject.phoneCustomer}</Text>
                                <Text>Địa chỉ: {selectedProject.addressCustomer}</Text>
                                <Text>Thành tiền: {Number(selectedProject.startingPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                            </Flex>
                        </Col>
                    </Flex>
                </Flex>
            </Col>
        </>
    )
}

export default DeliveringStage;