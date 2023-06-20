import React, {useEffect} from 'react';
import {Button, Col, Container, Image} from "react-bootstrap";
import styles from './Home.module.css'
import {CREATE_TEST_ROUTE, MAIN_PAGE_ROUTE, REGISTER_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import Test from "./Test";
import TestItem from "../components/TestItem";
import {useDispatch, useSelector} from "react-redux";
import GuestTest from "../components/GuestTest";
import CategoryBar from "../components/CategoryBar";
import {getAllTests} from "../redux/features/auth/testSlice";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const tests = useSelector((state) => state.test.tests)
    const user = useSelector((state) => state.auth.user)
    let categoryId = useSelector((state) => state.test.categoryId)

    useEffect(() => {
        const params = {
            categoryId: 2,
            name: null,
            limit: 1,
        }
        dispatch(getAllTests(params))
        console.log(params)
    }, [])

    useEffect(() => {
        const params = {
            categoryId: categoryId,
            name: null,
            limit: 1,
        }
        dispatch(getAllTests(params))
        console.log(params)
    }, [dispatch, categoryId])

    return (
        <div>
            <div className={styles.imageContainer}>
                <Container>
                    <div className={styles.title}>
                        СОЗДАЙТЕ СВОЙ ТЕСТ
                    </div>
                    <div className={styles.description}>
                        Пройди быструю регистрацию и создай свой тест в нашем простом и удобном конструкторе тестов для развлечений или обучения
                    </div>
                    <div className={styles.btnStart}>
                        <Button
                            variant={"danger"}
                            onClick={() => navigate(!user ? REGISTER_ROUTE : CREATE_TEST_ROUTE)}
                            style={{width: 250, height:75, fontSize: 20}}
                        >
                            Создать тест
                        </Button>
                    </div>
                </Container>
            </div>
            <Container>
                <div className={styles.startTitle}>
                    Попробуйте наши гостевые тесты
                </div>
                <Col md={12}>
                    <CategoryBar homePage={true}/>
                </Col>

                <div className={styles.startContainer}>
                    {categoryId === 2 && <GuestTest/>}
                    {categoryId === 3 && <GuestTest/>}
                </div>
            </Container>
            <Container>
                <div className={styles.startTitle}>
                    Проходите тесты бесплатно
                </div>
                <div className={styles.flexContainer}>
                    <div className={styles.flexElement}>
                        <div className={styles.flexTitle}>
                            Пройдите быструю регистрацию и создайте свой первый тест
                        </div>
                        <div className={styles.btnStart2}>
                            <Button
                                variant={"danger"}
                                onClick={() => navigate(!user ? REGISTER_ROUTE : CREATE_TEST_ROUTE)}
                                style={{width: 250, height:75, backgroundColor: '#000000'}}
                            >
                                РЕГИСТРАЦИЯ
                            </Button>
                        </div>
                    </div>
                    <div className={styles.flexElement}>
                        <div className={styles.flexTitle}>
                            Проходите уже созданные другими пользователями тесты
                        </div>
                        <div className={styles.btnStart2}>
                            <Button
                                variant={"danger"}
                                onClick={() => navigate(MAIN_PAGE_ROUTE)}
                                style={{width: 250, height:75, backgroundColor: '#000000'}}
                            >
                                КАТАЛОГ ТЕСТОВ
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
            <div className={styles.footer}>
                <div className={styles.textContainer}>
                    <div className={styles.footerText}>
                        Компания: СПбГАСУ
                    </div>
                    <div className={styles.footerText}>
                        Разработчик: Шевченко Виталий
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;