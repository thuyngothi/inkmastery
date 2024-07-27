import { useState } from 'react'
import { Button, Col, Divider, Flex, Typography } from 'antd'
import { CloseOutlined, FundProjectionScreenOutlined, RightOutlined, FileImageOutlined, FileDoneOutlined, DeliveredProcedureOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

import { useSelectedProject } from '../../App'      // this function is aim to get value of Context Provider

import styles from './Project.module.scss'
import InitializingStage from './initializingStage/InitializingStage'


const { Title, Text } = Typography
const ProjectProcess = () => {
    const { selectedProject } = useSelectedProject();

    const [activeStage, setActiveStage] = useState(0)
    const [doneStage, setDoneStage] = useState([0])
    const navigate = useNavigate()

    const handleChooseStage = (value) => {
        switch (value) 
        {
            case 0: {
                if(doneStage.includes(1)){
                    // setDoneStage(prev => [...prev.slice(0,1)])
                    setDoneStage(prev => prev.slice(0,1))
                    setActiveStage(0);
                    break;
                }
                break;
            }
            case 1: {
                if (doneStage.includes(2)) {
                    // setDoneStage(prev => [...prev.slice(0,2)])
                    setDoneStage(prev => prev.slice(0,2))
                    setActiveStage(1)
                    break;
                } else {
                    if (!doneStage.includes(1)) {
                        setActiveStage(1)
                        doneStage.push(1)
                        break;
                    }
                    break;
                }
            }
            case 2: {
                if (!doneStage.includes(1)) {
                    setActiveStage(1)
                    doneStage.push(1)
                    break;
                } else {
                    if (!doneStage.includes(2)) {
                        doneStage.push(2)
                        setActiveStage(2)
                        break;
                    }else{
                        if(doneStage.includes(3)){
                            // setDoneStage(prev => [...prev.slice(0,3)])
                            setDoneStage(prev => prev.slice(0,3))
                            setActiveStage(2)
                        }
                    }
                }
            }
            case 3: {
                if (!doneStage.includes(2)) {                  
                    // setActiveStage(2)
                    // doneStage.push(2)
                    handleChooseStage(2);
                    break;
                    
                } else {
                    if (!doneStage.includes(3)) {
                        doneStage.push(3)
                        setActiveStage(3)
                        break;
                    }
                    break;
                }
            }
        }
    }

    return (
        <>
            <Flex vertical className={styles.projectProcess}>
                <Flex align='center' justify='space-between' style={{ width: '100%', padding: '16px' }}>
                    <Title style={{ marginBottom: '0' }} level={3}>Tên dự án: {selectedProject.projectName}</Title>
                    <button className={styles.closeBtn}
                        onClick={() => navigate('home/projects')}
                    >
                        {<CloseOutlined />}
                        </button>
                </Flex>

                <Flex justify='center' gap='middle' className={styles.navMenu}>
                    <Flex gap='small' align='center' vertical
                        className={clsx(styles.iconStage, { [styles.activeStage]: doneStage.includes(0) })}
                        onClick={() => handleChooseStage(0)}
                    >
                        {<FundProjectionScreenOutlined />}
                        <Text>Dự án</Text>
                    </Flex>
                    <Flex gap='middle' className={{ [styles.activeStage]: doneStage.includes(1) }}
                        onClick={() => handleChooseStage(1)}
                    >
                        {<RightOutlined />}
                        <Flex gap='small' align='center' vertical className={styles.iconStage}>
                            {<FileImageOutlined />}
                            <Text>Thiết kế</Text>
                        </Flex>
                    </Flex>
                    <Flex gap='middle' className={{ [styles.activeStage]: doneStage.includes(2) }}
                        onClick={() => handleChooseStage(2)}
                    >
                        {<RightOutlined />}
                        <Flex gap='small' align='center' vertical className={styles.iconStage}>
                            {<FileDoneOutlined />}
                            <Text>In ấn</Text>
                        </Flex>
                    </Flex>
                    <Flex gap='middle' className={{ [styles.activeStage]: doneStage.includes(3) }}
                        onClick={() => handleChooseStage(3)}
                    >
                        {<RightOutlined />}
                        <Flex gap='small' align='center' vertical className={styles.iconStage}>
                            {<DeliveredProcedureOutlined />}
                            <Text>Giao hàng</Text>
                        </Flex>
                    </Flex>

                </Flex>
                <Divider style={{ backgroundColor: '#d6d9e485', margin: '0' }}></Divider>

                <Flex wrap className={styles.stageContent}>
                    <InitializingStage />
                </Flex>
            </Flex>

        </>
    )
}

export default ProjectProcess;