import { useEffect, useState } from 'react'
import { Flex, Form, Select, Typography, Divider, Button, Tooltip, Modal, message } from "antd"
import { MoreOutlined } from '@ant-design/icons'

import instance from '../axiosInstance'
import styles from './Delivery.module.scss'
import clsx from 'clsx'

const { Title, Text } = Typography
const Delivery = () => {
    const currentUserEmail = JSON.parse(localStorage.getItem('userInfor')).Email;

    const [loading, setLoading] = useState(false)
    const [deliveries, setDeliveries] = useState([])
    const [currentStatus, setCurrentStatus] = useState('')

    const [isOpenDelivery, setIsOpenDelivery] = useState(false)
    const [isOpenConfirm, setIsOpenConfirm] = useState(false)
    const [isChangeStatus, setIsChangeStatus ] = useState(false)

    const [chosenDelivery, setChosenDelivery] = useState({})

    const [putData, setPutData] = useState({})

    // Logic get all Deliveries
    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await instance.post('api/User/GetAllDelivery')
                if (response.status === 200) {
                    const allDeliveries = response.data.filter(item =>
                        item.deliver.email === currentUserEmail)
                    if (currentStatus) {
                        setDeliveries(allDeliveries.filter(item =>
                            item.deliveryStatus === currentStatus
                        ))
                    } else {
                        setDeliveries(allDeliveries)
                    }
                    setIsChangeStatus(false)
                }
            } catch (error) {
                console.error('Lỗi: ', error)
            }
        }
        fetchDeliveries()
    }, [currentStatus, isChangeStatus])

    // Logic change current Status
    const onChangeStatus = (value) => {
        setCurrentStatus(value);
    }

    const handleOpenDelivery = (data) => {
        setIsOpenDelivery(true)
        setChosenDelivery(data)
    }
    const handleCloseDelivery = () => {
        setIsOpenDelivery(false)
        setChosenDelivery({})
    }

    // Logic handle confirm modal
    const handleOpenConfirm = (value) => {
        setIsOpenConfirm(true)
        setIsOpenDelivery(false)
        setPutData({
            DeliveryId: value,
            ConfirmStatus: 'Received',
        })
    }
    const handleCloseConfirm = () => {
        setIsOpenConfirm(false)
        setIsOpenDelivery(true)
        setPutData({})
    }
    const handleConfirmDelivery = async () => {
        setLoading(true)
        const formData = new FormData()
        formData.append('DeliveryId', putData.DeliveryId)
        formData.append('ConfirmStatus', putData.ConfirmStatus)
        try {
            const response = await instance.put('api/User/ShipperConfirmDelivery', formData)
            console.log(response)
            if (response.data.status === 200) {
                message.success(response.data.message)
                setIsOpenConfirm(false)
                setPutData({})
                setIsChangeStatus(true)
            }
        } catch (error) {
            console.error('Lỗi: ', error)
        }
        setLoading(false)
    }
    console.log(putData)

    const statusOptions = [
        {
            value: 'Waiting',
            label: 'Waiting',
        },
        {
            value: 'Delivering',
            label: 'Delivering',
        },
        {
            value: 'Delivered',
            label: 'Delivered'
        }
    ]

    return (
        <>
            <Flex vertical className={styles.deliveryContainer}>
                <Flex>
                    <Form>
                        <Form.Item className={styles.statusSelection}>
                            <Select
                                placeholder='Lọc theo trạng thái'
                                options={statusOptions}
                                onChange={onChangeStatus}
                            />
                        </Form.Item>
                    </Form>
                </Flex>

                <Flex vertical gap='small' className={styles.listDeliveries}>
                    <Flex justify='space-between'>
                        <Flex style={{ width: '20%' }}><Text>TÊN ĐƠN HÀNG</Text></Flex>
                        <Flex style={{ width: '16%' }}><Text>KHÁCH HÀNG</Text></Flex>
                        <Flex style={{ width: '14%' }}><Text>ĐỊA CHỈ</Text></Flex>
                        <Flex style={{ width: '15%' }}><Text>PTVC</Text></Flex>
                        <Flex style={{ width: '17%' }}><Text>VẬN CHUYỂN</Text></Flex>
                        <Flex style={{ width: '18%' }}><Text>TRẠNG THÁI</Text></Flex>
                    </Flex>
                    <Divider style={{ backgroundColor: '#d6d9e485', margin: '0' }}></Divider>

                    {
                        deliveries.map((item, index) => (
                            <Flex vertical key={index} gap='small' justify='center' className={styles.deliveryItem}>
                                <Flex justify='space-between' align='center'>
                                    <Flex style={{ width: '20%' }} className={styles.deliveryDetailItem}><Text>{item.project.projectName}</Text></Flex>
                                    <Flex style={{ width: '16%' }} className={styles.deliveryDetailItem}><Text>{item.project.customer}</Text></Flex>
                                    <Flex style={{ width: '14%' }} className={styles.deliveryDetailItem}><Text>{item.deliveryAddress}</Text></Flex>
                                    <Flex style={{ width: '15%' }} className={styles.deliveryDetailItem}><Text>{item.shippingMethodName}</Text></Flex>
                                    <Flex style={{ width: '17%' }} className={styles.deliveryDetailItem}><Text>{item.deliver.fullName}</Text></Flex>
                                    <Flex justify='space-between' style={{ width: '18%' }} className={styles.deliveryDetailItem} gap='small'>
                                        <Text>{item.deliveryStatus}</Text>
                                        <Tooltip title='Xem chi tiết'>
                                            <button className={styles.moreBtn}
                                                onClick={() => handleOpenDelivery(item)}
                                            >
                                                {<MoreOutlined />}
                                            </button>
                                        </Tooltip>
                                    </Flex>
                                </Flex>
                                <Divider style={{ backgroundColor: '#d6d9e485', margin: '0' }}></Divider>
                            </Flex>
                        ))
                    }

                </Flex>
            </Flex>
            <Modal
                open={isOpenDelivery}
                footer={null}
                onCancel={handleCloseDelivery}
                className={styles.modalDetailDelivery}
            >
                <Title level={4} style={{ textAlign: 'center' }}>Chi tiết đơn hàng</Title>
                <Text>Mã đơn hàng: {chosenDelivery.id}</Text>
                {!!chosenDelivery.project &&
                    <>
                        <Text>
                            Giá đơn hàng: {Number(chosenDelivery.project.startingPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </Text>
                        <Text>Tên đơn hàng: {chosenDelivery.project.projectName}</Text>
                    </>
                }
                {
                    !!chosenDelivery.customer &&
                    <>
                        <Text>Khách hàng: {chosenDelivery.customer.fullName}</Text>
                        <Text>Số điện thoại: {chosenDelivery.customer.phoneNumber}</Text>
                    </>
                }
                <Text>Địa chỉ giao hàng: {chosenDelivery.deliveryAddress}</Text>
                <Text>Phương thức vận chuyển: {chosenDelivery.shippingMethodName}</Text>
                {!!chosenDelivery.deliver &&
                    <Text>Người vận chuyển: {chosenDelivery.deliver.fullName}</Text>
                }
                <Text>Trạng thái đơn hàng: {chosenDelivery.deliveryStatus}</Text>
                <Flex gap='middle' justify='flex-end' style={{ marginTop: '16px' }}>
                    {chosenDelivery.deliveryStatus !== 'Delivered' &&
                        <button className={clsx('submitBtn', styles.btn)}
                            onClick={() => handleOpenConfirm(chosenDelivery.id)}
                        >
                            Xác nhận đơn hàng</button>
                    }
                    <button className={clsx('modal-cancelBtn', styles.btn)} onClick={handleCloseDelivery}>Thoát</button>
                </Flex>
            </Modal>

            <Modal
                open={isOpenConfirm}
                onCancel={handleCloseConfirm}
                footer={null}
            >
                <Title level={4} style={{ textAlign: 'center' }}>Xác nhận giao hàng</Title>
                <Text>Xác nhận đơn hàng đã được giao đến khách hàng?</Text>
                <Flex gap='middle' justify='flex-end' style={{ marginTop: '16px' }}>
                    <Button className={clsx('submitBtn', styles.btn)}
                        loading={loading}
                        onClick={handleConfirmDelivery}
                    >
                        Xác nhận</Button>
                    <Button className={clsx('modal-cancelBtn', styles.btn)} onClick={handleCloseConfirm}>Thoát</Button>
                </Flex>
            </Modal>
        </>
    )
}
export default Delivery;