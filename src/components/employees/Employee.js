import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Flex, Input, Modal, Typography, Form, Row, Select, message, Table, Space } from "antd"

import styles from './Employee.module.scss'
import { render } from "@testing-library/react";
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
        dataIndex: 'team',
        key: 'team',
    },
    {
        title: 'THAO TÁC',
        key: 'action',
        render: () => (
            <Space size="middle">
              <Button>UpdateDepart</Button>
              <Button>UpdateRole</Button>
              <Button>Delete</Button>
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
      team: 'Teachnical',
    },
    {
        key: '2',
        fullName: 'John Brown',
        email: 'email01@gmail.com',
        phoneNumber: '0972549878',
        team: 'Teachnical',
      },
      {
        key: '3',
        fullName: 'John Brown',
        email: 'email01@gmail.com',
        phoneNumber: '0972549878',
        team: 'Teachnical',
      },
  ];


const Employee = () => {
    return (
        <>
            <Flex vertical gap='middle' className={styles.employeeContainer}>
                <Flex style={{ width: '80%' }} gap='middle'>
                    <Input prefix={<SearchOutlined />} className='searchInput' placeholder="Tìm kiếm nhân viên" />
                    <Button className="submitBtn">Tìm kiếm</Button>
                </Flex>
                <Table columns={columns} dataSource={data} />
            </Flex>
        </>
    )
}
export default Employee;