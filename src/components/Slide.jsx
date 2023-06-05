import React, {useEffect, useState} from 'react'
import styles from './SliderStyles.module.css'
import {Button, Card, Col} from "react-bootstrap";

const Slide = ({question}) => {
    const [correctAnswer, setCorrectAnswer] = useState(0)
    const [answerDone, setAnswerDone] = useState(0)
    const [answerDone1, setAnswerDone1] = useState(0)
    const [answerDone2, setAnswerDone2] = useState(0)
    const [answerDone3, setAnswerDone3] = useState(0)
    const [answerDone4, setAnswerDone4] = useState(0)
    const handleCheckCorrectAnswer = (answer, index) => {
        switch (index) {
            case '1':
                return setAnswerDone1(1)
            case '2':
                return setAnswerDone2(1)
            case '3':
                return setAnswerDone3(1)
            case '4':
                return setAnswerDone4(1)
        }
        setAnswerDone(1)
        answer === question.correct_answer ? setCorrectAnswer(1) : setCorrectAnswer(0)
    }
    console.log(question)

    return (
        <div className={styles.slide}>
            <h3 className='text-center mt-3 text-success'>Вопрос</h3>
            <div className={styles.slideTitle}>{question?.name}</div>
            <div className='d-flex flex-row justify-content-center px-2'>
                <Button
                    variant={"outline-dark"}
                    className={
                        answerDone === 1
                            ? (correctAnswer === 1 && answerDone1 === 1
                                ? "mt-2 mx-lg-auto w-50 bg-success"
                                : (correctAnswer !== 1 && answerDone1 === 1
                                    ? "mt-2 mx-lg-auto w-50 bg-danger"
                                    : "mt-2 mx-lg-auto w-50"))
                            : "mt-2 mx-lg-auto w-50"
                    }
                    onClick={() => handleCheckCorrectAnswer(question.answer1, 1)}
                >
                    {question?.answer1}
                </Button>
                <div style={{width: 10}}></div>
                <Button
                    variant={"outline-dark"}
                    className={
                        answerDone === 1 && correctAnswer === 1 && answerDone2 === 1
                            ? (answerDone === 1 && correctAnswer === 1 && answerDone2 !== 1
                                ? "mt-2 mx-lg-auto w-50 bg-danger"
                                : "mt-2 mx-lg-auto w-50")
                            : "mt-2 mx-lg-auto w-50"
                    }
                    onClick={() => handleCheckCorrectAnswer(question.answer2, 2)}
                >
                    {question?.answer2}
                </Button>
            </div>
            <div className='d-flex flex-row justify-content-center px-2'>
                <Button
                    variant={"outline-dark"}
                    className={
                        answerDone === 1 && correctAnswer === 1 && answerDone3 === 1
                            ? (answerDone === 1 && correctAnswer === 1 && answerDone3 !== 1
                                ? "mt-2 mx-lg-auto w-50 bg-danger"
                                : "mt-2 mx-lg-auto w-50")
                            : "mt-2 mx-lg-auto w-50"
                    }
                    onClick={() => handleCheckCorrectAnswer(question.answer3, 3)}
                >
                    {question?.answer3}
                </Button>
                <div style={{width: 10}}></div>
                <Button
                    variant={"outline-dark"}
                    className={
                        answerDone === 1 && correctAnswer === 1 && answerDone4 === 1
                            ? (answerDone === 1 && correctAnswer === 1 && answerDone4 !== 1
                                ? "mt-2 mx-lg-auto w-50 bg-danger"
                                : "mt-2 mx-lg-auto w-50")
                            : "mt-2 mx-lg-auto w-50"
                    }
                    onClick={() => handleCheckCorrectAnswer(question.answer4, 4)}
                >
                    {question?.answer4}
                </Button>
            </div>
        </div>
    );
};

export default Slide;