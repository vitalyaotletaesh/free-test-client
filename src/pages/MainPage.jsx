import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TestList from "../components/TestList";
import {useDispatch, useSelector} from "react-redux";
import CategoryBar from "../components/CategoryBar";
import Pages from "../components/Pages";

const MainPage = () => {
    return (
        <Container>
            <Row className="mt-2">
                <h1 className="text-center mt-3">Популярные тесты</h1>
                <Col md={12}>
                    <CategoryBar/>
                </Col>
            </Row>
            <TestList/>
            <Pages/>
        </Container>
    );
};

export default MainPage;