import React, {useEffect} from 'react';
import {Button, Card, Col, Container, Image} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getTest} from "../redux/features/auth/testSlice";
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
            {/*{test ?*/}
            {/*    <Col md={9} className="mt-5 mx-lg-auto">*/}
            {/*        <Card style={{width: 300}} border={"light"} className="mx-lg-auto">*/}
            {/*            <Image width={300} height={300} src={'http://localhost:4444/' + test.img}/>*/}
            {/*            <div className="text-center mt-2">*/}
            {/*                {test.name}*/}
            {/*            </div>*/}
            {/*            <Button*/}
            {/*                variant={"outline-success"}*/}
            {/*                className="mt-3"*/}
            {/*            >*/}
            {/*                Начать тест*/}
            {/*            </Button>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*    :*/}
            {/*    <div></div>*/}
            {/*}*/}
            <Slider/>
        </Container>
    );
};

export default Test;