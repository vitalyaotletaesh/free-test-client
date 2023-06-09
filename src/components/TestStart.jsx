import React from 'react';
import styles from "./SliderStyles.module.css";
import {useDispatch, useSelector} from "react-redux";
import {Button, Image} from "react-bootstrap";
import {setQuestionIndex} from "../redux/features/auth/testSlice";

const TestStart = () => {
    const test = useSelector((state) => state.test?.test)
    const dispatch = useDispatch()

    const handleStartTest = () => {
        dispatch(setQuestionIndex(1))
    }

    return (
        <div className={styles.testContainer}>
            <div className={styles.stylesWrapper}>
                <div className={styles.startSection}>
                    <div className={styles.stylesImage}>
                        <Image src={process.env.REACT_APP_API_URL || 'http://localhost:4444/' + test?.img}
                               className={styles.image}
                        />
                    </div>
                    <div className={styles.stylesContent}>
                        <h1 className={styles.title}>Тест</h1>
                        <p className={styles.testName}>{test?.name}</p>
                        <div className={styles.infoContainer}>
                            <Button
                                variant={'success'}
                                style={{marginRight: 20}}
                                onClick={handleStartTest}
                            >
                                Начать тест
                            </Button>
                            <div className={styles.completes}>
                                <div>
                                    Прохождений: {test?.completes}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestStart;