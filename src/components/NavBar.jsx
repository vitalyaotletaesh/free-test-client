import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {checkIsAuth, logout} from "../redux/features/auth/authSlice"
import {Button, Container} from 'react-bootstrap';
import {Navbar} from 'react-bootstrap'
import {Nav} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {ACCOUNT_ROUTE, ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, MAIN_PAGE_ROUTE} from "../utils/consts";

const NavBar = ({role}) => {
    const isAuth = useSelector(checkIsAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        navigate(LOGIN_ROUTE)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: "white", textDecoration: "none", fontSize: 22}} to={HOME_ROUTE}>Ｔｅｓｔｉｘ</NavLink>
                {isAuth ?
                    <Nav className="ml-auto">
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(MAIN_PAGE_ROUTE)}
                        >
                            Тесты
                        </Button>
                        <Button
                            variant={"outline-light"}
                            className="ms-lg-2"
                            onClick={() => navigate(ADMIN_ROUTE)}
                            style={role === 'ADMIN' ? {display: "inline"} : {display: "none"}}
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={"outline-light"}
                            className="ms-lg-2"
                            onClick={logoutHandler}
                        >
                            Выйти
                        </Button>
                        <Button
                            variant={"outline-light"}
                            className="ms-lg-2"
                            onClick={() => navigate(ACCOUNT_ROUTE)}
                        >
                            Профиль
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(MAIN_PAGE_ROUTE)}
                        >
                            Тесты
                        </Button>
                        <Button
                            variant={"outline-light"}
                            className="ms-lg-2"
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Войти
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
};

export default NavBar