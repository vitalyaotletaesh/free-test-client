import React, {useEffect} from 'react';
import {Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getAllTests} from "../redux/features/auth/testSlice";
import TestItem from "./TestItem";

const TestList = () => {
    const dispatch = useDispatch()
    const tests = useSelector((state) => state.test.tests)
    let categoryId = useSelector((state) => state.test.categoryId)

    const limit = useSelector((state) => state.test.limit)
    const activePage = useSelector((state) => state.test.page)

    useEffect(() => {
        categoryId === 1 ? categoryId = null : categoryId = categoryId
        const params = {
            categoryId: categoryId,
            name: null,
            page: activePage,
            limit: limit,
        }
        dispatch(getAllTests(params))
    }, [dispatch, categoryId, activePage, limit])

    return (
        <Row className="d-flex">
            {tests?.length > 0 && tests.map(test =>
                <TestItem key={test.id} test={test}/>
            )}
        </Row>
    );
};

export default TestList;