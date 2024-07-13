import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Flex, Layout, Typography, Menu, Input, Card, Avatar, Modal } from "antd";

import styles from './Home.module.scss'
import logo from '../../assets/images/logoPrint.png'

const { Title, Text } = Typography

const MainContent = () => {
    return (
        <>
            <Flex wrap gap='large' justify='space-between' style={{ padding: '16px' }}>
                <Card
                    hoverable
                    style={{ width: '30%', backgroundColor: '#2f3349' }}
                    cover={
                        <img src={logo} />
                    }
                >
                    <Flex vertical>
                        <Title level={3}>In Thiệp cưới</Title>
                        <Text>Write descritption here. something more about this object</Text>
                    </Flex>
                </Card>
                <Card
                    hoverable
                    style={{ width: '30%', backgroundColor: '#2f3349' }}
                    cover={
                        <img src={logo} />
                    }
                >
                    <Flex vertical>
                        <Title level={3}>In Thiệp cưới</Title>
                        <Text>Write descritption here. something more about this object</Text>
                    </Flex>
                </Card>
                <Card
                    hoverable
                    style={{ width: '30%', backgroundColor: '#2f3349' }}
                    cover={
                        <img src={logo} />
                    }
                >
                    <Flex vertical>
                        <Title level={3}>In Thiệp cưới</Title>
                        <Text>Write descritption here. something more about this object</Text>
                    </Flex>
                </Card>
                <Card
                    hoverable
                    style={{ width: '30%', backgroundColor: '#2f3349' }}
                    cover={
                        <img src={logo} />
                    }
                >
                    <Flex vertical>
                        <Title level={3}>In Thiệp cưới</Title>
                        <Text>Write descritption here. something more about this object</Text>
                    </Flex>
                </Card>
                <Card
                    hoverable
                    style={{ width: '30%', backgroundColor: '#2f3349' }}
                    cover={
                        <img src={logo} />
                    }
                >
                    <Flex vertical>
                        <Title level={3}>In Thiệp cưới</Title>
                        <Text>Write descritption here. something more about this object</Text>
                    </Flex>
                </Card>
                <Card
                    hoverable
                    style={{ width: '30%', backgroundColor: '#2f3349' }}
                    cover={
                        <img src={logo} />
                    }
                >
                    <Flex vertical>
                        <Title level={3}>In Thiệp cưới</Title>
                        <Text>Write descritption here. something more about this object</Text>
                    </Flex>
                </Card>
                <Card
                    hoverable
                    style={{ width: '30%', backgroundColor: '#2f3349' }}
                    cover={
                        <img src={logo} />
                    }
                >
                    <Flex vertical>
                        <Title level={3}>In Thiệp cưới</Title>
                        <Text>Write descritption here. something more about this object</Text>
                    </Flex>
                </Card>
            </Flex>
        </>
    )
}

export default MainContent;