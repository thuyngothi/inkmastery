import { Flex, Typography, Form } from 'antd'

const { Title, Text, Paragraph } = Typography
const Login = () => {
    return (
        <>
            <Flex>
                <Flex style={{
                    width: '60%'
                }}>
                    <Title> Image</Title>
                </Flex>
                <Flex vertical>
                    <Title>INKMASTERY</Title>
                    <Title level={4}>Chào Mừng Đến Với InkMastery!</Title>
                    <Text>Vui lòng đăng nhập vào tài khoản của bạn và bắt đầu cuộc phiêu lưu</Text>
                    <Form.Item>

                    </Form.Item>
                </Flex>
            </Flex>
        </>
    )
}

export default Login;