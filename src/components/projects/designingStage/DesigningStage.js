import { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Flex, Select, Typography, Modal, Input, Image, message } from 'antd'
import { FolderAddOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

import { useSelectedProject } from '../../../App';

import styles from './DesigningStage.module.scss'
import axios from 'axios'

const { Title, Text } = Typography
const DesigningStage = () => {
    const token = localStorage.getItem('token')
    const instance = axios.create({
        baseURL: 'https://localhost:44389',
        timeout: 5000,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const { selectedProject, setSelectedProject } = useSelectedProject();

    const [changeDesign, setChangeDesign] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)
    const [valueDesign, setValueDesign] = useState('')
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    const [hasApprovedDesign, setHasApprovedDesign] = useState(false)
    const currentUser = JSON.parse(localStorage.getItem('userInfor'))
    const [currentUserTeam, setCurrentUserTeam] = useState('')

    //Logic get currentuser's teamName
    useEffect(() => {
        const fetchData = async() => {
            const response = await instance.get(`api/User/GetUserById/${currentUser.Id}`)
            console.log(response)
            setCurrentUserTeam(response.data.teamName)       
        }
        fetchData()
    },[])
    console.log(currentUserTeam)

    //Logic set Selected project if changed
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`api/Admin/GetProjectById/${selectedProject.id}`)
                if (response.status === 200) {
                    setSelectedProject(response.data)
                    setChangeDesign(false)

                    //Check if list design has an approved design
                    const approvedDesign = response.data.designs.find(item => item.designStatus === 'HasBeenApproved')
                    if (approvedDesign) {
                        setHasApprovedDesign(true)
                    }
                }
            } catch (error) {
                message.error('Lỗi: ', error)
            }
        }

        fetchData()
    }, [changeDesign])

    // Logic create new design
    const onFileChange = (e) => {
        const file = e.target.files[0]

        setValueDesign(e.target.value)
        setData(prev => ({
            ...prev,
            DesignImage: file,
        }))
    }
    const handleOpenCreate = () => {
        setOpenCreate(true)
        setData(prev => ({
            ...prev,
            ProjectId: selectedProject.id,
        }))
    }
    const handleCancel = () => {
        setOpenCreate(false)
        setData({})
        setValueDesign('')
    }

    const handleCreate = async () => {
        setLoading(true)

        const formData = new FormData()
        formData.append('ProjectId', data.ProjectId)
        formData.append('DesignImage', data.DesignImage)
        try {
            const instance = axios.create({
                baseURL: 'https://localhost:44389',
                timeout: 5000,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

            const response = await instance.post('api/Admin/CreateDesign', formData)
            console.log(response)
            if (response.data.status === 200) {
                message.success("Thêm thiết kế thành công!")
                setChangeDesign(true)
                handleCancel()
            } else {
                message.error(response.data.message)
                handleCancel()
            }
        } catch (error) {
            message.error("Lỗi! Không thể thêm thiết kế")
            console.error('Lỗi: ', error)
        }
        setLoading(false)
    }
    
    const options = [
        {
            value: 'Agree',
            label: 'Phê duyệt',
        },
        {
            value: 'Refuse',
            label: 'Không phê duyệt',
        }
    ]

    // Logic approve design
    const [isOpenApprove, setIsOpenApprove] = useState(false)
    const [formConfirm, setFormConfirm] = useState({})

    const handleOpenApprove = (id) => {
        setIsOpenApprove(true);
        setFormConfirm({ DesignId: id })
    }
    const handleCloseApprove = () => {
        setIsOpenApprove(false)
        setFormConfirm({})
    }

    const onChangeDesignStatus = (value) => {
        setFormConfirm(prev => ({
            ...prev,
            DesignApproval: value,
        }))
    }
    const handleChangeDesignStatus = async () => {
        const formApprove = new FormData()
        formApprove.append('DesignId', formConfirm.DesignId)
        formApprove.append('DesignApproval', formConfirm.DesignApproval)

        try {
            const instance = axios.create({
                baseURL: 'https://localhost:44389',
                timeout: 5000,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            const response = await instance.put('api/Admin/ApprovalDesign', formApprove)
            console.log(response)
            if (response.status === 200) {
                setChangeDesign(true);
                message.success(response.data)
            }
        } catch (error) {
            console.log('Lỗi: ', error)
        }
    }

    return (
        <>
            <Col xs={24} lg={16} className={styles.designingImg}>
                <Flex wrap gap='middle' className={styles.designList}>
                    {
                        selectedProject.designs.map(design => {
                            const createDate = new Date(design.designTime)
                            return (
                                <Card
                                    className={styles.cardImg}
                                    cover={
                                        <Flex>
                                            <div style={{
                                                borderRadius: '8px',
                                                backgroundImage: `url(${design.designImage})`,
                                                backgroundSize: 'cover',
                                                height: '200px',
                                            }}>
                                            </div>
                                        </Flex>
                                    }
                                >
                                    <Text>Người tạo: {design.designer}</Text>
                                    <Text>Ngày tạo: {`${createDate.getDate()}/${createDate.getMonth() + 1}/${createDate.getFullYear()}`}</Text>
                                    {design.designStatus === 'NotYetApproved' && <Text>Trạng thái: Chưa xem xét</Text>}
                                    {design.designStatus === 'Refuse' && <Text>Trạng thái: <span style={{color:'#c73e3e'}}>Không được duyệt</span></Text>}
                                    {design.designStatus === 'HasBeenApproved' && <Text>Trạng thái: <span style={{color:'#15b468'}}>Đã được duyệt</span></Text>}
                                    {
                                        !hasApprovedDesign &&
                                        currentUser.Email === selectedProject.emailLeader &&
                                        <Button className={clsx('submitBtn', styles.approveBtn)}
                                            onClick={() => handleOpenApprove(design.id)}
                                        >
                                            Phê duyệt
                                        </Button>
                                    }
                                </Card>
                            )
                        })
                    }
                    <Modal
                        open={isOpenApprove}
                        onCancel={handleCloseApprove}
                        footer={null}
                    >
                        <Form className={styles.formResponse}
                            onFinish={handleChangeDesignStatus}
                        >
                            <Title level={5}>Chọn phê duyệt hoặc không phê duyệt!</Title>
                            <Form.Item>
                                <Select
                                    name='designStatus'
                                    value={formConfirm.DesignApproval}
                                    onChange={onChangeDesignStatus}
                                    options={options}
                                />
                            </Form.Item>
                            <Form.Item style={{ marginBottom: '1px' }}>
                                <Flex gap='middle' justify="flex-end">
                                    <Button className={clsx('submitBtn', styles.updateBtn)} htmlType="submit" type="primary">Xác nhận</Button>
                                    <Button className="modal-cancelBtn"
                                        onClick={handleCloseApprove}
                                    >
                                        Thoát
                                    </Button>
                                </Flex>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Flex>
                {
                    !hasApprovedDesign &&
                    currentUser.Permission.includes('Designer') &&
                    currentUserTeam === 'Technical' &&
                    <Button className={styles.uploadBtn}
                        icon={<FolderAddOutlined />}
                        onClick={handleOpenCreate}
                    >
                        Tải File
                    </Button>
                }

                <Modal
                    open={openCreate}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Title style={{ textAlign: 'center' }} level={3}>Tải file ảnh</Title>
                    <Form layout="vertical"
                        onFinish={handleCreate}
                    >
                        <Flex align="center" gap='middle'>
                            <Form.Item>
                                <Image />
                                <Input
                                    name='DesignImage'
                                    type="file"
                                    value={valueDesign}
                                    onChange={onFileChange}
                                />
                            </Form.Item>
                        </Flex>
                        <Form.Item>
                            <Flex gap='middle' justify="flex-end">
                                <Button
                                    className={clsx('submitBtn', styles.createBtn)}
                                    htmlType="submit"
                                    type="primary"
                                    loading={loading}
                                >
                                    Thêm mới
                                </Button>
                                <Button className="modal-cancelBtn"
                                    onClick={handleCancel}
                                >
                                    Thoát
                                </Button>
                            </Flex>
                        </Form.Item>
                    </Form>
                </Modal>
            </Col>

            <Col xs={24} lg={8}>
                <Flex vertical className={styles.mainInfor}>
                    <Title level={4}>Thông tin dự án</Title>
                    <Flex wrap>
                        <Col xs={24}>
                            <Flex vertical className={styles.inforItem}>
                                <Text>Tên dự án: {selectedProject.projectName}</Text>
                                <Text>Khách hàng: {selectedProject.customer}</Text>
                                <Text>Quản lý: {selectedProject.leader}</Text>
                                <Text>Mô tả: {selectedProject.description}</Text>
                                <Text>Yêu cầu khách hàng: {selectedProject.requestDescriptionFromCustomer}</Text>
                            </Flex>
                        </Col>
                    </Flex>
                </Flex>

            </Col>
        </>
    )
}

export default DesigningStage;