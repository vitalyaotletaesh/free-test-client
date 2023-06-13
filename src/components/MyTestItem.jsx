import React from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import axios from "../utils/axios";
import {getAllTests, getMyTests} from "../redux/features/auth/testSlice";
import {useDispatch, useSelector} from "react-redux";

const MyTestItem = ({test, id}) => {
    const dispatch = useDispatch()

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
                    {/*<Button*/}
                    {/*    variant={"outline-success"}*/}
                    {/*    className="mt-1 w-50"*/}
                    {/*>*/}
                    {/*    Редактировать*/}
                    {/*</Button>*/}
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