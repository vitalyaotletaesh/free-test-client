import React, {useEffect} from 'react';
import {Button, Card, Col, Container, Image} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getTest, setQuestionIndex} from "../redux/features/auth/testSlice";
import {useParams} from "react-router-dom";
import Slider from "../components/Slider";

const Test = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const test = useSelector((state) => state.test.test)

    useEffect(() => {
        dispatch(getTest(id))
    }, [dispatch])

    return (
        <Container>
            <Slider/>
        </Container>
    );
};

export default Test;