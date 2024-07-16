import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Flex, Button, Typography, Divider, Form, Input, Row, Col } from "antd";
import { useEffect, useState } from "react";
import clsx from "clsx";

import Infor from './Infor.js'
import ChangePass from './ChangePass.js'
import styles from './Profile.module.scss'

import avatar from '../../assets/images/avatars/avatar-10.png'

const { Title } = Typography
const Profile = ({userInfor}) => {
    const [focus, setFocus] = useState('profile')
    useEffect(() => {
        if (focus === 'profile') {
            // const response = async axios.get('')
        }
    }, [focus])

    const callProfile = () => {
        setFocus('profile')
    }

    const changePass = () => {
        setFocus('changePass')
    }

    return (
        <>
            <Flex vertical gap='middle' className={styles.profileContainer}>
                <Flex gap='large'>
                    <Button size="large"
                        value='profile'
                        className={clsx(styles.btn, styles.profileBtn, { [styles.active]: focus === 'profile' })}
                        icon={<UserOutlined />}
                        onClick={callProfile}
                    >
                        Tài khoản
                    </Button>

                    <Button size="large"
                        value='changePass'
                        className={clsx(styles.btn, styles.profileBtn, { [styles.active]: focus === 'changePass' })}
                        icon={<LockOutlined />}
                        onClick={changePass}
                    >
                        Đổi Mật Khẩu
                    </Button>
                </Flex>
                <ChangePass />
                <Infor userInfor={userInfor} />
            </Flex>
        </>
    )
}

export default Profile;