import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useInput} from "../utils/customHooks/registerHooks";

const QuestionContainer = ({index, getData}) => {
    const questionName = useInput('', {isEmpty: true})
    const answer1 = useInput('', {isEmpty: true})
    const answer2 = useInput('', {isEmpty: true})
    const answer3 = useInput('', {isEmpty: true})
    const answer4 = useInput('', {isEmpty: true})
    const [correctAnswer, setCorrectAnswer] = useState('')

    useEffect(() => {
        const data = {
            questionText: questionName.value,
            answer1: answer1.value,
            answer2: answer2.value,
            answer3: answer3.value,
            answer4: answer4.value,
            correctAnswer,
        }
        getData(index, data)
    }, [questionName.value, answer1.value, answer2.value, answer3.value, answer4.value, correctAnswer])

    return (
        <>
            {(questionName.isDirty && questionName.isEmpty) &&
                <div style={{color: "red"}}>Поле не может быть пустым</div>}
            <Form.Control
                className="mt-3"
                placeholder={`Вопрос ${index + 1}`}
                value={questionName.value}
                onChange={e => questionName.onChange(e)}
                onBlur={e => questionName.onBlur(e)}
            />
            {(answer1.isDirty && answer1.isEmpty) &&
                <div style={{color: "red"}}>Поле не может быть пустым</div>}
            <div className="d-flex flex-row justify-content-between">
                <div>
                    <Form.Check
                        className="mt-4"
                        inline
                        name={index}
                        type='radio'
                        id={`inline-radio-1`}
                        onClick={() => setCorrectAnswer(answer1.value)}
                    />
                </div>
                <Form.Control
                    className="mt-3"
                    placeholder="Ответ 1"
                    value={answer1.value}
                    onChange={e => answer1.onChange(e)}
                    onBlur={e => answer1.onBlur(e)}
                />
            </div>
            {(answer2.isDirty && answer2.isEmpty) &&
                <div style={{color: "red"}}>Поле не может быть пустым</div>}
            <div className="d-flex flex-row justify-content-between">
                <div>
                    <Form.Check
                        className="mt-4"
                        inline
                        name={index}
                        type='radio'
                        id={`inline-radio-2`}
                        onClick={() => setCorrectAnswer(answer2.value)}
                    />
                </div>
                <Form.Control
                    className="mt-3"
                    placeholder="Ответ 2"
                    value={answer2.value}
                    onChange={e => answer2.onChange(e)}
                    onBlur={e => answer2.onBlur(e)}
                />
            </div>
            {(answer3.isDirty && answer3.isEmpty) &&
                <div style={{color: "red"}}>Поле не может быть пустым</div>}
            <div className="d-flex flex-row justify-content-between">
                <div>
                    <Form.Check
                        className="mt-4"
                        inline
                        name={index}
                        type='radio'
                        id={`inline-radio-3`}
                        onClick={() => setCorrectAnswer(answer3.value)}
                    />
                </div>
                <Form.Control
                    className="mt-3"
                    placeholder="Ответ 3"
                    value={answer3.value}
                    onChange={e => answer3.onChange(e)}
                    onBlur={e => answer3.onBlur(e)}
                />
            </div>
            {(answer4.isDirty && answer4.isEmpty) &&
                <div style={{color: "red"}}>Поле не может быть пустым</div>}
            <div className="d-flex flex-row justify-content-between">
                <div>
                    <Form.Check
                        className="mt-4"
                        inline
                        name={index}
                        type='radio'
                        id={`inline-radio-4`}
                        onClick={() => setCorrectAnswer(answer4.value)}
                    />
                </div>
                <Form.Control
                    className="mt-3"
                    placeholder="Ответ 4"
                    value={answer4.value}
                    onChange={e => answer4.onChange(e)}
                    onBlur={e => answer4.onBlur(e)}
                />
            </div>
        </>
    );
};

export default QuestionContainer;