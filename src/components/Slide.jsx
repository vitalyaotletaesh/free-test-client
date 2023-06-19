import React, {useEffect, useState} from 'react'
import styles from './Test.module.css'
import {Button, Card, Col, ListGroup, ProgressBar} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    clearStatistics, getAnnotation, getStatistics,
    setQuestionIndex,
    setQuestionIndexNull,
    setQuestionStatistics
} from "../redux/features/auth/testSlice";
import axios from "../utils/axios";

const Slide = ({count}) => {
    const dispatch = useDispatch()
    const test = useSelector((state) => state.test?.test)
    const question = useSelector((state) => state.test.question[0])
    const questionIndex = useSelector((state) => state.test.questionIndex)
    const annotation = useSelector((state) => state.test?.annotation)
    const user = useSelector((state) => state.auth?.user)
    const [isAnswerDone, setIsAnswerDone] = useState(false)
    const [answer, setAnswer] = useState('')
    const [result, setResult] = useState(0)
    const [isTestEnd, setIsTestEnd] = useState(false)

    const showAnnotation = test?.showAnnotation
    const [checkAnswer1, setCheckAnswer1] = useState(false)
    const [checkAnswer2, setCheckAnswer2] = useState(false)
    const [checkAnswer3, setCheckAnswer3] = useState(false)
    const [checkAnswer4, setCheckAnswer4] = useState(false)
    const [showAnnotation1, setShowAnnotation1] = useState(false)
    const [showAnnotation2, setShowAnnotation2] = useState(false)
    const [showAnnotation3, setShowAnnotation3] = useState(false)
    const [showAnnotation4, setShowAnnotation4] = useState(false)
    const [answerIndex, setAnswerIndex] = useState(0)

    const [trueAnswer1, setTrueAnswer1] = useState(false)
    const [trueAnswer2, setTrueAnswer2] = useState(false)
    const [trueAnswer3, setTrueAnswer3] = useState(false)
    const [trueAnswer4, setTrueAnswer4] = useState(false)

    const [isDisabled, setIsDisabled] = useState(false)

    const statistics = useSelector((state) => state.test?.statistics)
    const statisticsFromDB = useSelector((state) => state.test?.statisticsFromDB)

    useEffect(() => {
        const params = {
            questionId: question.id,
        }
        dispatch(getAnnotation(params))
        dispatch(getStatistics(params))
    }, [question])

    const handleCheckCorrectAnswer = (answer, index) => {
        setAnswer(answer)
        setAnswerIndex(index)
        setIsAnswerDone(true)
    }

    const handleNextQuestion = () => {
        // ПРОВЕРКА НУЖНА ЛИ АННОТАЦИЯ
        if (showAnnotation) {
            switch (answerIndex) {
                case 1:
                    setShowAnnotation1(true)
                    break
                case 2:
                    setShowAnnotation2(true)
                    break
                case 3:
                    setShowAnnotation3(true)
                    break
                case 4:
                    setShowAnnotation4(true)
                    break
            }

            // ПРОВЕРКА ПРАВИЛЬНЫЙ ЛИ ОТВЕТ
            if (answer === question.correct_answer) {
                switch (answerIndex) {
                    case 1:
                        setTrueAnswer1(true)
                        setCheckAnswer1(true)
                        break
                    case 2:
                        setTrueAnswer2(true)
                        setCheckAnswer2(true)
                        break
                    case 3:
                        setTrueAnswer3(true)
                        setCheckAnswer3(true)
                        break
                    case 4:
                        setTrueAnswer4(true)
                        setCheckAnswer4(true)
                        break
                }
            } else {
                switch (answerIndex) {
                    case 1:
                        setCheckAnswer1(true)
                        break
                    case 2:
                        setCheckAnswer2(true)
                        break
                    case 3:
                        setCheckAnswer3(true)
                        break
                    case 4:
                        setCheckAnswer4(true)
                        break
                }
            }
        } else {
            setCheckAnswer1(false)
            setCheckAnswer2(false)
            setCheckAnswer3(false)
            setCheckAnswer4(false)
        }
        setIsDisabled(true)
        setTimeout(() => changeQuestion(), 2000)
    }

    const changeQuestion = () => {
        setIsDisabled(false)
        setCheckAnswer1(false)
        setCheckAnswer2(false)
        setCheckAnswer3(false)
        setCheckAnswer4(false)
        dispatch(setQuestionIndex(1))
        answer === question.correct_answer && setResult(currentResult => {
            return currentResult + 1
        })
        answer !== question.correct_answer && setResult(currentResult => {
            return currentResult
        })
        setIsAnswerDone(false)
        setAnswer('')
        setTrueAnswer1(false)
        setTrueAnswer2(false)
        setTrueAnswer3(false)
        setTrueAnswer4(false)
        setShowAnnotation1(false)
        setShowAnnotation2(false)
        setShowAnnotation3(false)
        setShowAnnotation4(false)
        setAnswerIndex(0)

        dispatch(setQuestionStatistics({answerIndex, questionId: question.id}))
        questionIndex === count && handleGetResult()
    }

    const handleGetResult = () => {
        setIsTestEnd(true)
    }

    const calcStatistics = async (data, index) => {
        console.log(data)
        switch (data.answerIndex) {
            case 1:
                await axios.post('statistic/incAnswer1', {questionId: data.questionId})
                break
            case 2:
                await axios.post('statistic/incAnswer2', {questionId: data.questionId})
                break
            case 3:
                await axios.post('statistic/incAnswer3', {questionId: data.questionId})
                break
            case 4:
                await axios.post('statistic/incAnswer4', {questionId: data.questionId})
                break
        }
        dispatch(clearStatistics())
    }

    useEffect(() => {
        if (statistics?.length === count) {
            async function fetchData() {
                const res1 = await axios.post('test/incCompletes', {id: test.id})
            }

            fetchData().then()
            statistics.map((data, index) => (
                calcStatistics(data, index)
            ))
        }
    }, [statistics])

    const saveResult = async () => {
        async function fetchData() {
            console.log(result)
            const res2 = await axios.post('attempt/create', {
                userId: user.id,
                testId: test.id,
                result: (result / count) * 100
            })
        }

        if (user) {
            fetchData().then()
        }
    }

    useEffect(() => {
        statistics?.length === count && saveResult()
    }, [result])

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <div
                    className={styles.image}
                    style={{
                        backgroundImage: `url(${process.env.REACT_APP_API_URL
                            ? process.env.REACT_APP_API_URL + '/' + test?.img
                            : 'http://localhost:4444/' + test?.img})`
                    }}
                >
                </div>
                {!isTestEnd ?
                    <div className={styles.testContent}>
                        <div className={styles.questionProgress}>
                            ВОПРОС <span> {questionIndex}</span> ИЗ <span>{count}</span>
                        </div>
                        <ProgressBar now={(questionIndex / count) * 100} style={{marginBottom: 24}} min={0} max={100}/>
                        <div className={styles.question}>
                            {question?.name}
                        </div>
                        <div className={styles.answers}>
                            <ListGroup>
                                <ListGroup.Item
                                    onClick={() => handleCheckCorrectAnswer(question.answer1, 1)}
                                    action
                                    style={checkAnswer1 ?
                                        !trueAnswer1
                                            ?
                                            {
                                                padding: 15,
                                                backgroundColor: "red",
                                                color: 'white',
                                                opacity: 0.5,
                                                borderColor: "red"
                                            }
                                            :
                                            {
                                                padding: 15,
                                                backgroundColor: "green",
                                                color: 'white',
                                                opacity: 0.5
                                            }
                                        :
                                        {padding: 15}}
                                >
                                    {showAnnotation ?
                                        !showAnnotation1
                                            ?
                                            question?.answer1
                                            :
                                            <div className='d-flex flex-row justify-content-between'>
                                                <div>{question?.answer1}</div>
                                                <div>{annotation?.name}</div>
                                                <div>
                                                    {statisticsFromDB.answersTotal !== 0 ?
                                                        Math.round(statisticsFromDB.answerDone1 / statisticsFromDB.answersTotal * 100) + '%'
                                                        :
                                                        '0%'
                                                    }
                                                </div>
                                            </div>
                                        :
                                        <div>{question?.answer1}</div>
                                    }
                                </ListGroup.Item>
                                <ListGroup.Item
                                    onClick={() => handleCheckCorrectAnswer(question.answer2, 2)}
                                    action
                                    style={checkAnswer2 ?
                                        !trueAnswer2
                                            ?
                                            {
                                                padding: 15,
                                                backgroundColor: "red",
                                                color: 'white',
                                                opacity: 0.5,
                                                borderColor: "red"
                                            }
                                            :
                                            {
                                                padding: 15,
                                                backgroundColor: "green",
                                                color: 'white',
                                                opacity: 0.5
                                            }
                                        :
                                        {padding: 15}}
                                >
                                    {showAnnotation ?
                                        !showAnnotation2
                                            ?
                                            question?.answer2
                                            :
                                            <div className='d-flex flex-row justify-content-between'>
                                                <div>{question?.answer2}</div>
                                                <div>{annotation?.name}</div>
                                                <div>
                                                    {statisticsFromDB.answersTotal !== 0 ?
                                                        Math.round(statisticsFromDB.answerDone2 / statisticsFromDB.answersTotal * 100) + '%'
                                                        :
                                                        '0%'
                                                    }
                                                </div>
                                            </div>
                                        :
                                        <div>{question?.answer2}</div>
                                    }
                                </ListGroup.Item>
                                <ListGroup.Item
                                    onClick={() => handleCheckCorrectAnswer(question.answer3, 3)}
                                    action
                                    style={checkAnswer3 ?
                                        !trueAnswer3
                                            ?
                                            {
                                                padding: 15,
                                                backgroundColor: "red",
                                                color: 'white',
                                                opacity: 0.5,
                                                borderColor: "red"
                                            }
                                            :
                                            {
                                                padding: 15,
                                                backgroundColor: "green",
                                                color: 'white',
                                                opacity: 0.5
                                            }
                                        :
                                        {padding: 15}}
                                >
                                    {showAnnotation ?
                                        !showAnnotation3
                                            ?
                                            question?.answer3
                                            :
                                            <div className='d-flex flex-row justify-content-between'>
                                                <div>{question?.answer3}</div>
                                                <div>{annotation?.name}</div>
                                                <div>
                                                    {statisticsFromDB.answersTotal !== 0 ?
                                                        Math.round(statisticsFromDB.answerDone3 / statisticsFromDB.answersTotal * 100) + '%'
                                                        :
                                                        '0%'
                                                    }
                                                </div>
                                            </div>
                                        :
                                        <div>{question?.answer3}</div>
                                    }
                                </ListGroup.Item>
                                <ListGroup.Item
                                    onClick={() => handleCheckCorrectAnswer(question.answer4, 4)}
                                    action
                                    style={checkAnswer4 ?
                                        !trueAnswer4
                                            ?
                                            {
                                                padding: 15,
                                                backgroundColor: "red",
                                                color: 'white',
                                                opacity: 0.5,
                                                borderColor: "red"
                                            }
                                            :
                                            {
                                                padding: 15,
                                                backgroundColor: "green",
                                                color: 'white',
                                                opacity: 0.5
                                            }
                                        :
                                        {padding: 15}}
                                >
                                    {showAnnotation ?
                                        !showAnnotation4
                                            ?
                                            question?.answer4
                                            :
                                            <div className='d-flex flex-row justify-content-between'>
                                                <div>{question?.answer4}</div>
                                                <div>{annotation?.name}</div>
                                                <div>
                                                    {statisticsFromDB.answersTotal !== 0 ?
                                                        Math.round(statisticsFromDB.answerDone4 / statisticsFromDB.answersTotal * 100) + '%'
                                                        :
                                                        '0%'
                                                    }
                                                </div>
                                            </div>
                                        :
                                        <div>{question?.answer4}</div>
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                        {isAnswerDone &&
                            <div className={styles.btnNext}>
                                <Button
                                    variant={'success'}
                                    style={{marginRight: 20}}
                                    onClick={handleNextQuestion}
                                >
                                    {questionIndex !== count ? 'Дальше' : 'К результатам'}
                                </Button>
                            </div>
                        }
                    </div>
                    :
                    (
                        <div className={styles.testContent}>
                            <div className={styles.answers}>
                                <div className={styles.resultContainer}>
                                    <div>Тест окончен</div>
                                    <div style={{padding: 24, fontWeight: 400}}>
                                        Ваш резульат: {Math.round((result / count) * 100)}%
                                    </div>
                                    <Button
                                        variant={'outline-success'}
                                        onClick={() => dispatch(setQuestionIndexNull())}
                                        disabled={isDisabled}
                                    >
                                        Начать заново
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Slide;