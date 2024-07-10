import { Flex, Layout, Typography, Menu } from "antd";

import styles from './Home.module.scss'
import logo from '../../assets/images/logoPrint.png'

const { Title, Text } = Typography
const Home = () => {
    return (
        <>
            <Flex vertical className={styles.sidebar}>
                <Flex>
                    <img src={logo}></img>
                    <Text>InkMastery</Text>
                </Flex>

                <Menu items={[
                    {
                        id: 1,
                        label: 'Thống kê'
                    },
                    {
                        id: 2,
                        label: 'Quán lý kho'
                    },
                    {
                        id: 3,
                        label: 'Quản lý giao hàng'
                    }
                ]}>
                </Menu>

            </Flex>
        </>
    )
}

export default Home;