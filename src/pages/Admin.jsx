import React, {useEffect, useState} from 'react';
import {Card, Col, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getAllTests} from "../redux/features/auth/testSlice";

const Admin = () => {
    const dispatch = useDispatch()
    const tests = useSelector((state) => state.test.tests)

    useEffect(() => {
        const params = {
            limit: 0,
            page: 0,
        }
        dispatch(getAllTests(params))
    }, [dispatch, tests])

    return (
        <Container className="d-flex">
            <Col md={6} className="mt-3">
                <Card border={"light"} className="mx-lg-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </Card>
            </Col>

            <Col md={6} className="mt-3 m-lg-3">
                <Card border={"light"} className="mx-lg-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Test name</th>
                            <th>Author</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tests?.length > 0 ?
                            tests.map((test, index) => (
                                <tr key={index}>
                                    <th>{test.name}</th>
                                    <th>Author</th>
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