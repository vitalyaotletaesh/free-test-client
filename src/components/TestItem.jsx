import React from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {TEST_ROUTE} from "../utils/consts";

const TestItem = ({test}) => {
    const navigate = useNavigate()

    return (
        <Col md={4} className="mt-3" onClick={() => navigate(TEST_ROUTE + '/' + test.id)}>
            <Card style={{width: 300, cursor: 'pointer'}} border={"light"}>
                <Image
                    width={300}
                    height={300}
                    src={process.env.REACT_APP_API_URL
                        ? process.env.REACT_APP_API_URL + '/' + test.img
                        : 'http://localhost:4444/' + test.img}/>
                <div className="text-center mt-2">
                    {test.name}
                </div>
                <div className="text-center text-black-50">
                    Прохождений: {test.completes}
                </div>
            </Card>
        </Col>
    );
};

export default TestItem;