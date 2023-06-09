import React, {useEffect, useState} from 'react';
import styles from './SliderStyles.module.css'
import Arrows from "./Arrows";
import {useDispatch, useSelector} from "react-redux";
import Slide from "./Slide";
import {getAllQuestions} from "../redux/features/auth/testSlice";
import TestStart from "./TestStart";

const Slider = () => {
    const dispatch = useDispatch()
    const questionIndex = useSelector((state) => state.test.questionIndex)
    const testId = useSelector((state) => state.test?.test?.id)
    const test = useSelector((state) => state.test.test)
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
        <div>
            {questionIndex === null ?
                <TestStart/>
                :
                <Slide count={test && test?.questions?.length}/>
            }
        </div>
    );
};

export default Slider;