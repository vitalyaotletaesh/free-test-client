import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getAllTests, setQuestionIndex, setQuestionIndexNull} from "../redux/features/auth/testSlice";
import axios from "../utils/axios";

const Admin = () => {
    const dispatch = useDispatch()
    const tests = useSelector((state) => state.test.tests)

    useEffect(() => {
        dispatch(setQuestionIndexNull())
    }, [])

    useEffect(() => {
        const params = {
            limit: 0,
            page: 0,
        }
        dispatch(getAllTests(params))
    }, [dispatch])

    const handleDeleteTest = (id) => {
        const params = {
            limit: 0,
            page: 0,
        }
        axios.delete(`/test/delete/${id}`).then(
            dispatch(getAllTests(params))
        )
    }

    return (
        <Container className="d-flex">
            {/*<Col md={6} className="mt-3">*/}
            {/*    <Card border={"light"} className="mx-lg-auto">*/}
            {/*        <table className="table">*/}
            {/*            <thead>*/}
            {/*            <tr>*/}
            {/*                <th style={{color: "green"}}>Username</th>*/}
            {/*                <th style={{color: "green"}}>Email</th>*/}
            {/*            </tr>*/}
            {/*            </thead>*/}
            {/*            <tbody>*/}

            {/*            </tbody>*/}
            {/*        </table>*/}
            {/*    </Card>*/}
            {/*</Col>*/}

            <Col md={12} className="mt-3 m-lg-3">
                <Card border={"light"} className="mx-lg-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th style={{color: "green"}}>Test name</th>
                            <th style={{color: "green"}}>Author</th>
                            <th style={{color: "green"}}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tests?.length > 0 ?
                            tests.map((test, index) => (
                                <tr key={index}>
                                    <th>{test.name}</th>
                                    <th>Author</th>
                                    <th>
                                        <Button
                                            variant={"outline-danger"}
                                            className="mt-1 w-100"
                                            onClick={() => handleDeleteTest(test.id)}
                                        >
                                            Удалить
                                        </Button>
                                    </th>
                                </tr>
                            ))
                            :
                            <tr></tr>
                        }
                        </tbody>
                    </table>
                </Card>
            </Col>
        </Container>
    );
};

export default Admin;