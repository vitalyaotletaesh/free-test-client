import React from 'react'
import styles from './SliderStyles.module.css'
import {useDispatch, useSelector} from "react-redux"
import {setQuestionIndex} from "../redux/features/auth/testSlice"

const Arrows = () => {
    let questionIndex = useSelector((state) => state.test.questionIndex)
    const dispatch = useDispatch()

    const handleChangeQuestion = (value) => {
        dispatch(setQuestionIndex(value))
    }

    return (
        <div>
            <div className={styles.arrows}>
                <div className={`${styles.arrow} + ${styles.left}`} onClick={() => handleChangeQuestion(-1)}>
                    &#8680;
                </div>
                <div className={`${styles.arrow} + ${styles.right}`} onClick={() => handleChangeQuestion(1)}>
                    &#8680;
                </div>
            </div>
        </div>
    );
};

export default Arrows;