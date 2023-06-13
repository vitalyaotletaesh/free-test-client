import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMyTests} from "../redux/features/auth/testSlice";
import {Button, Row} from "react-bootstrap";
import MyTestItem from "./MyTestItem";

const MyTestsList = () => {
    const dispatch = useDispatch()
    const tests = useSelector((state) => state.test.myTests)
    const user = useSelector((state) => state.auth.user)

    useEffect(() => {
        dispatch(getMyTests({id: user.id}))
    }, [dispatch])

    return (
        <>
            <Row className="d-flex mx-lg-auto text-center mb-5">
                <h2 className="mt-3">Ваши тесты</h2>
                {tests.map(test =>
                    <MyTestItem key={test.id} test={test} id={user.id}/>
                )}
            </Row>
        </>
    );
};

export default MyTestsList;