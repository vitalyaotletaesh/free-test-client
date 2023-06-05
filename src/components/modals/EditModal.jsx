import React, {useEffect} from 'react';
import './EditModal.css'
import {Button, Card, Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, REGISTER_ROUTE} from "../../utils/consts";
import {useInput} from "../../utils/customHooks/registerHooks";
import {useDispatch} from "react-redux";
import {updateEmail, updateUsername} from "../../redux/features/auth/authSlice";

const EditModal = ({open, field, data, onClose, validations}) => {
    const validate = useInput('', validations)
    const validateForPassword = useInput('', validations)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(validate.value)
    }, [validate.value])

    const handleUpdateUser = () => {
        if (field === 'Username') {
            dispatch(updateUsername({username: validate.value}))
        }
        if (field === 'Email') {
            dispatch(updateEmail({email: validate.value}))
        }
        handleOnClose()
    }

    const handleOnClose = () => {
        onClose(false)
        validate.onCloseModal('')
        validateForPassword.onCloseModal('')
    }

    if (!open) return null
    return (
        <div className='overlay' onClick={handleOnClose}>
            <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                <Form className="d-flex flex-column mx-lg-auto w-75">
                    {field === 'Пароль' ?
                        <>
                            <h3 className="text-center">Смените пароль</h3>

                            {(validate.isDirty && validate.isEmpty) &&
                                <div style={{color: "red"}}>Поле не может быть пустым</div>}
                            {(validate.isDirty && validate.minLengthError) &&
                                <div style={{color: "red"}}>Пароль не может быть короче 5 символов</div>}
                            {(validate.isDirty && validate.maxLengthError) &&
                                <div style={{color: "red"}}>Пароль не может быть длиннее 10 символов</div>}
                            <Form.Control
                                className="mt-3"
                                placeholder="Старый пароль"
                                value={validate.value}
                                onChange={e => validate.onChange(e)}
                                onBlur={e => validate.onBlur(e)}
                            />
                            {(validateForPassword.isDirty && validateForPassword.isEmpty) &&
                                <div style={{color: "red"}}>Поле не может быть пустым</div>}
                            {(validateForPassword.isDirty && validateForPassword.minLengthError) &&
                                <div style={{color: "red"}}>Пароль не может быть короче 5 символов</div>}
                            {(validateForPassword.isDirty && validateForPassword.maxLengthError) &&
                                <div style={{color: "red"}}>Пароль не может быть длиннее 10 символов</div>}
                            <Form.Control
                                className="mt-3"
                                placeholder="Новый пароль"
                                value={validateForPassword.value}
                                onChange={e => validateForPassword.onChange(e)}
                                onBlur={e => validateForPassword.onBlur(e)}
                            />
                        </>
                        :
                        <>
                            <h3 className="text-center">Введите новый {field}</h3>

                            {(field === 'Email' &&
                                (validate.isDirty && validate.isEmpty) &&
                                <div style={{color: "red"}}>Поле не может быть пустым</div>)}
                            {(field === 'Email' &&
                                (validate.isDirty && validate.minLengthError) &&
                                <div style={{color: "red"}}>Email не может быть короче 4 символов</div>)}
                            {(field === 'Email' &&
                                (validate.isDirty && validate.emailError) &&
                                <div style={{color: "red"}}>Неверный формат почты</div>)}

                            {(field === 'Username' &&
                                (validate.isDirty && validate.isEmpty) &&
                                <div style={{color: "red"}}>Поле не может быть пустым</div>)}
                            {(field === 'Username' &&
                                (validate.isDirty && validate.minLengthError) &&
                                <div style={{color: "red"}}>Username не может быть короче 5 символов</div>)}

                            <Form.Control
                                className="mt-3"
                                placeholder={field}
                                value={validate.value}
                                onChange={e => validate.onChange(e)}
                                onBlur={e => validate.onBlur(e)}
                            />
                        </>
                    }

                    <div className="d-flex flex-row justify-content-between">
                        <Button
                            variant={"outline-success"}
                            className="mt-3 w-50"
                            disabled={!validate.inputValid}
                            onClick={handleUpdateUser}
                        >
                            Подтвердить
                        </Button>
                        <div style={{width: 5}}></div>
                        <Button
                            variant={"outline-danger"}
                            className="mt-3 w-50"
                            onClick={handleOnClose}
                        >
                            Отмена
                        </Button>
                    </div>
                </Form>
            </div>
            Modal
        </div>
    );
};

export default EditModal;