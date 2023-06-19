import React, {useEffect, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE, MAIN_PAGE_ROUTE, REGISTER_ROUTE} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, loginUser, registerUser} from "../redux/features/auth/authSlice";
import {useInput} from "../utils/customHooks/registerHooks";
import {setQuestionIndex, setQuestionIndexNull} from "../redux/features/auth/testSlice";

const Login = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const isAuth = useSelector(checkIsAuth)
    const navigate = useNavigate()

    const email = useInput('', {isEmpty: true, minLength: 4, isEmail: true})
    const password = useInput('', {isEmpty: true, minLength: 5, maxLength: 10})
    const passwordRepeat = useInput('', {isEmpty: true, minLength: 5, isEquals: password.value})
    const username = useInput('', {isEmpty: true, minLength: 5})

    dispatch(setQuestionIndexNull())

    useEffect(() => {
        if (isAuth) {
            navigate(HOME_ROUTE)
        }
    }, [isAuth, navigate])

    const handleSubmit = () => {
        try {
            if (!isLogin) {
                try {
                    dispatch(registerUser({email: email.value, username: username.value, password: password.value}))
                } catch (err) {
                    console.log("err.response.data.message")
                }
            } else {
                try {
                    dispatch(loginUser({email: email.value, password: password.value}))
                } catch (err) {
                    console.log("err.response.data.message")
                }
            }
        } catch (err){
            alert("err.response.data.message")
        }

    }

    return (
        <Container className="d-flex justify-content-center align-items-center h-100">
            <Card style={{width: 600}} className="p-5 mt-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    {isLogin ?
                        <>
                            <Form.Control
                                className="mt-3"
                                placeholder="Email"
                                value={email.value}
                                onChange={e => email.onChange(e)}
                                onBlur={e => email.onBlur(e)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Пароль"
                                value={password.value}
                                onChange={e => password.onChange(e)}
                                onBlur={e => password.onBlur(e)}
                            />
                        </>
                        :
                        <>
                            {(email.isDirty && email.isEmpty) &&
                                <div style={{color: "red"}}>Поле не может быть пустым</div>}
                            {(email.isDirty && email.minLengthError) &&
                                <div style={{color: "red"}}>Email не может быть короче 4 символов</div>}
                            {(email.isDirty && email.emailError) &&
                                <div style={{color: "red"}}>Неверный формат почты</div>}
                            <Form.Control
                                className="mt-3"
                                placeholder="Email"
                                value={email.value}
                                onChange={e => email.onChange(e)}
                                onBlur={e => email.onBlur(e)}
                            />
                            {(username.isDirty && username.isEmpty) &&
                                <div style={{color: "red"}}>Поле не может быть пустым</div>}
                            {(username.isDirty && username.minLengthError) &&
                                <div style={{color: "red"}}>Username не может быть короче 5 символов</div>}
                            <Form.Control
                                className="mt-3"
                                placeholder="Username"
                                value={username.value}
                                onChange={e => username.onChange(e)}
                                onBlur={e => username.onBlur(e)}
                            />
                            {(password.isDirty && password.isEmpty) &&
                                <div style={{color: "red"}}>Поле не может быть пустым</div>}
                            {(password.isDirty && password.minLengthError) &&
                                <div style={{color: "red"}}>Пароль не может быть короче 5 символов</div>}
                            {(password.isDirty && password.maxLengthError) &&
                                <div style={{color: "red"}}>Пароль не может быть длиннее 10 символов</div>}
                            <Form.Control
                                className="mt-3"
                                placeholder="Пароль"
                                value={password.value}
                                onChange={e => password.onChange(e)}
                                onBlur={e => password.onBlur(e)}
                            />
                            {(passwordRepeat.isDirty && passwordRepeat.isEmpty) &&
                                <div style={{color: "red"}}>Поле не может быть пустым</div>}
                            {(passwordRepeat.isDirty && passwordRepeat.passwordRepeatError) &&
                                <div style={{color: "red"}}>Пароли не совпадают</div>}
                            <Form.Control
                                className="mt-3"
                                placeholder="Повторите пароль"
                                value={passwordRepeat.value}
                                onChange={e => passwordRepeat.onChange(e)}
                                onBlur={e => passwordRepeat.onBlur(e)}
                            />
                        </>
                    }
                    {isLogin ?
                        <Button
                            variant={"outline-success"}
                            className="mt-3"
                            onClick={handleSubmit}
                        >
                            Войти
                        </Button>
                        :
                        <Button
                            variant={"outline-success"}
                            className="mt-3"
                            onClick={handleSubmit}
                            disabled={!email.inputValid || !password.inputValid || !passwordRepeat.inputValid || !username.inputValid}
                        >
                            Регистрация
                        </Button>}
                    {isLogin ?
                        <div className="mt-1">
                            Нет аккаунта? <NavLink to={REGISTER_ROUTE}>Зарегистрироваться</NavLink>
                        </div>
                        :
                        <div className="mt-1">
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
                        </div>
                    }

                </Form>
            </Card>
        </Container>
    );
};

export default Login;