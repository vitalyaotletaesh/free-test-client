import React from 'react';
import {Button, Card, Col} from "react-bootstrap";
import axios from "../utils/axios";
import {getMyTests} from "../redux/features/auth/testSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RESULTS_ROUTE} from "../utils/consts";

const MyTestItem = ({test, id}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDeleteTest = () => {
        axios.delete(`/test/delete/${test.id}`).then(
            dispatch(getMyTests({id}))
        )
    }

    return (
        <Col md={6} className="mt-3">
            <Card border={"light"}>
                <div className="text-center mt-2">
                    {test.name}
                </div>
                <div className="text-center text-black-50">
                    Прохождений: {test.completes}
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <Button
                        variant={"outline-success"}
                        className="mt-1 w-50"
                        onClick={() => navigate(RESULTS_ROUTE + '/' + test.id)}
                    >
                        Результаты
                    </Button>
                    <div style={{width: 5}}></div>
                    <Button
                        variant={"outline-danger"}
                        className="mt-1 w-50"
                        onClick={handleDeleteTest}
                    >
                        Удалить
                    </Button>
                </div>
            </Card>
        </Col>
    );
};

export default MyTestItem;