import React, {useEffect, useState} from 'react';
import axios from "../utils/axios";
import {useParams} from "react-router-dom";
import {Button, Card, Col, Container} from "react-bootstrap";

const Results = () => {
    const {id} = useParams()
    const [data, setData] = useState()

    useEffect(() => {
        axios.get(`/attempt/${id}`).then((res) => setData(res.data))
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <Container className='m-auto'>
            <Col md={12} className="mt-3 m-lg-3">
                <Card border={"light"} className="mx-lg-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th style={{color: "green"}}>Имя пользователя</th>
                            <th style={{color: "green"}}>Результат</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data?.length > 0 ?
                            data.map((results, index) => (
                                <tr key={index}>
                                    <th>{results.user.username}</th>
                                    <th>{results.attempt.result}%</th>
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

export default Results;