import React, {useEffect, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import QuestionContainer from "../components/QuestionContainer";
import {useInput} from "../utils/customHooks/registerHooks";
import {useDispatch, useSelector} from "react-redux";
import axios from "../utils/axios";
import {useNavigate} from "react-router-dom";
import {ACCOUNT_ROUTE} from "../utils/consts";
import {getAllCategories, setQuestionIndexNull} from "../redux/features/auth/testSlice";

const CreateTest = () => {
    const navigate = useNavigate()
    const [questions, setQuestions] = useState([])
    const [dataIsEmpty, setDataIsEmpty] = useState(true)
    const [formIsValid, setFormIsValid] = useState(false)
    const testName = useInput('', {isEmpty: true})
    const [file, setFile] = useState(null)
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.test.categories)
    const [category, setCategory] = useState(2)
    const [showAnnotation, setShowAnnotation] = useState(false)
    const userId = useSelector((state) => state.auth.user.id)

    useEffect(() => {
        dispatch(getAllCategories())
        dispatch(setQuestionIndexNull())
    }, [])

    // Отправка запроса на создание теста
    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append('name', testName.value)
        formData.append('categoryId', category)
        formData.append('img', file)
        formData.append('userId', userId)
        formData.append('showAnnotation', showAnnotation)

        const {data} = await axios.post('/test/create', formData)
        const handleCreateQuestion = async (question, index) => {
            const addQuestion = {
                name: question.questionText,
                answer1: question.answer1,
                answer2: question.answer2,
                answer3: question.answer3,
                answer4: question.answer4,
                correct_answer: question.correctAnswer,
                testId: data.id,
            }
            const questionData = await axios.post('/question/create', addQuestion)
            const annotation = {
                name: question.annotation,
                questionId: questionData.data.id,
            }
            await axios.post('/annotation/create', annotation)
            await axios.post('/statistic/create', {questionId: questionData.data.id})
        }
        questions.map((question, index) => (
            handleCreateQuestion(question, index)
        ))
        navigate(ACCOUNT_ROUTE)
    }

    // Сохранения категории в стейт
    const categoryHandler = (e) => {
        setCategory(e.target.value)
    }

    // Сохранения файла в стейт
    const handleFile = (e) => {
        const {target} = e
        if (target.value.length > 0) {
            setFile(target.files[0])
        } else {
            target.reset();
        }
    }


    // Проверка всей формы на валидность
    useEffect(() => {
        if (!dataIsEmpty && file !== null && testName.value !== '') {
            setFormIsValid(true)
        } else {
            setFormIsValid(false)
        }
    }, [file, testName, dataIsEmpty, formIsValid])

    // Вызов checkDataIsEmpty для проверки валидности компонента question
    const handleCheckDataIsEmpty = (questions) => {
        questions.map((value, index) =>
            checkDataIsEmpty(value)
        )
    }
    // проверка валидности компонента question
    const checkDataIsEmpty = (value) => {
        value.questionText === '' ? setDataIsEmpty(true) : setDataIsEmpty(false)
        value.answer1 === '' ? setDataIsEmpty(true) : setDataIsEmpty(false)
        value.answer2 === '' ? setDataIsEmpty(true) : setDataIsEmpty(false)
        value.answer3 === '' ? setDataIsEmpty(true) : setDataIsEmpty(false)
        value.answer4 === '' ? setDataIsEmpty(true) : setDataIsEmpty(false)
        value.annotation === '' ? setDataIsEmpty(true) : setDataIsEmpty(false)
        value.correctAnswer === '' ? setDataIsEmpty(true) : setDataIsEmpty(false)
    }

    // Создание нового пустого массива question
    const handleAddQuestion = () => {
        const newQuestion = {
            questionText: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            annotation: '',
            correctAnswer: '',
        }

        const updatedQuestions = [...questions, newQuestion]
        setQuestions(updatedQuestions)
        handleCheckDataIsEmpty(updatedQuestions)
    }

    // Изменение массива question с данными от юзера
    const handleChangeQuestionData = (index, data) => {
        const newQuestion = {
            questionText: data.questionText,
            answer1: data.answer1,
            answer2: data.answer2,
            answer3: data.answer3,
            answer4: data.answer4,
            annotation: data.annotation,
            correctAnswer: data.correctAnswer,
        };

        const updatedQuestions = [...questions]
        updatedQuestions[index] = newQuestion
        setQuestions(updatedQuestions)
        handleCheckDataIsEmpty(updatedQuestions)
    }

    return (
        <Container className="d-flex justify-content-center align-items-center h-100">
            <Card style={{width: 600}} className="p-5 mt-5">
                <h2 className="m-auto">Создайте свой тест!</h2>
                <Form className="d-flex flex-column">
                    {(testName.isDirty && testName.isEmpty) &&
                        <div style={{color: "red"}}>Поле не может быть пустым</div>}
                    <Form.Control
                        className="mt-3"
                        placeholder="Название теста"
                        value={testName.value}
                        onChange={e => testName.onChange(e)}
                        onBlur={e => testName.onBlur(e)}
                    />
                    <Form.Select
                        aria-label="Категория"
                        className="mt-3"
                        value={category}
                        onChange={categoryHandler}>
                        {categories?.length > 0 ? (categories.map((category, index) => (
                                    category.name !== 'Все' && (
                                        <option
                                            key={index}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    )
                                ))
                            ) :
                            <option
                                value={'Категории не созданы'}
                            >
                                Категории не созданы
                            </option>
                        }
                    </Form.Select>
                    <Form.Label className="mt-1">Изображение для теста*</Form.Label>
                    <Form.Control
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => handleFile(e)}
                    />
                    <Form.Check
                        className="mt-3"
                        inline
                        type='checkbox'
                        label={'Показывать пояснение к ответу'}
                        onChange={() => setShowAnnotation(!showAnnotation)}
                    />


                    {questions?.length > 0 ? (
                        questions.map((question, index) => (
                            <React.Fragment key={index}>
                                <div>
                                    <QuestionContainer index={index} getData={handleChangeQuestionData}/>
                                </div>
                            </React.Fragment>
                        ))
                    ) : (
                        <></>
                    )}


                    <Button
                        variant={"outline-success"}
                        className="mt-3"
                        onClick={handleAddQuestion}
                    >
                        Добавить вопрос
                    </Button>
                    <Button
                        variant={"outline-success"}
                        className="mt-3"
                        disabled={!formIsValid}
                        onClick={handleSubmit}
                    >
                        Создать
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default CreateTest;