import { useEffect, useState } from "react";
import { DeleteOutlined, SearchOutlined, UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Flex, Input, Modal, Typography, Form, Row, Select, message, Table, Space } from "antd"

import styles from './Employee.module.scss'
import { render } from "@testing-library/react";
import clsx from "clsx";
import axios from "axios";
const { Title } = Typography
const { Column, ColumnGroup } = Table
const columns = [
    {
        title: 'HỌ VÀ TÊN',
        dataIndex: 'fullName',
        key: 'fullName',
    },
    {
        title: 'EMAIL',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'SỐ ĐIỆN THOẠI',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
    {
        title: 'NHÓM',
        dataIndex: 'teamName',
        key: 'teamName',
    },
    {
        title: 'THAO TÁC',
        key: 'action',
        render: () => (
            <Space size="middle">
              <Button className={clsx(styles.btn, styles.changeManagementBtn)} shape="circle">{<UserAddOutlined />}</Button>
              <Button className={clsx(styles.btn, styles.addRoleBtn)} shape="circle">{<UsergroupAddOutlined />}</Button>
              <Button className={clsx(styles.btn, styles.deleteBtn)} shape="circle">{<DeleteOutlined />}</Button>
            </Space>
          ),
    },
]

const data = [
    {
      key: '1',
      fullName: 'John Brown',
      email: 'email01@gmail.com',
      phoneNumber: '0972549878',
      teamName: 'Teachnical',
    },
    {
        key: '2',
        fullName: 'John Brown',
        email: 'email01@gmail.com',
        phoneNumber: '0972549878',
        teamName: 'Teachnical',
      },
      {
        key: '3',
        fullName: 'John Brown',
        email: 'email01@gmail.com',
        phoneNumber: '0972549878',
        teamName: 'Teachnical',
      },
  ];

const Employee = () => {
    const[employees, setEmployees] = useState([])
    const[isChange, setIsChange] = useState(false)

    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get('https://localhost:44389/api/User/GetAllUsers')
            if(response && response.status === 200){
                    let data1 = []
                    response.data.forEach((element, index) => {
                        const {fullName, email, phoneNumber, teamName } = element;
                        data1.push({
                            key: index,
                            fullName,
                            email,
                            phoneNumber,
                            teamName,
                        })
                    });
                setEmployees(data1)
            }
        }

        fetchData();
    }, [isChange])
    console.log(employees)

    return (
        <>
            <Flex vertical gap='middle' className={styles.employeeContainer}>
                <Flex style={{ width: '80%' }} gap='middle'>
                    <Input prefix={<SearchOutlined />} className='searchInput' placeholder="Tìm kiếm nhân viên" />
                    <Button className="submitBtn">Tìm kiếm</Button>
                </Flex>
                <Table className={styles.tableEmployee} columns={columns} dataSource={employees} />
            </Flex>
        </>
    )
}
export default Employee;