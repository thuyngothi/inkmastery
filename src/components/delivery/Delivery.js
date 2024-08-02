import { useState } from 'react'
import { Flex, Typography } from "antd"

const { Title } = Typography
const Delivery = () => {
    const [count, setCount] = useState(0)

    const handleCount = () => {
        setCount(count + 1)
    }

    return(
        <>
            { console.log('re-render')}
            <Flex vertical>
                <Title>This is Delivery management page</Title>
                <button onClick={handleCount}>Count</button>
            </Flex>
        </>
    )
}
export default Delivery;