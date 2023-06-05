import React, {useEffect, useState} from 'react';
import styles from './SliderStyles.module.css'
import Arrows from "./Arrows";
import {useDispatch, useSelector} from "react-redux";
import Slide from "./Slide";
import {getAllQuestions} from "../redux/features/auth/testSlice";

const Slider = () => {
    const dispatch = useDispatch()
    const questionIndex = useSelector((state) => state.test.questionIndex)
    const testId = useSelector((state) => state.test?.test?.id)
    const question = useSelector((state) => state.test.question)

    useEffect(() => {
        const params = {
            limit: 1,
            slide: questionIndex,
            testId: testId
        }
        dispatch(getAllQuestions(params))
    }, [dispatch, questionIndex, testId])


    return (
        <div
            style={{width: 600, height: 500}}
            className={styles.slider}
        >
            <Arrows/>
            {/*{questions?.length > 0 ? (*/}
            {/*        questions.map((question, index) => (*/}
            {/*            <Slide key={index} question={question}/>*/}
            {/*        ))*/}
            {/*    )*/}
            {/*    :*/}
            {/*    <div>qwe</div>*/}
            {/*}*/}
            {question ? <Slide question={question[0]}/> : <div></div>}
        </div>
    );
};

export default Slider;