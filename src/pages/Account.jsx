import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container} from "react-bootstrap";
import UserItem from "../components/UserItem";
import MyTestsList from "../components/MyTestsList";
import EditModal from "../components/modals/EditModal";
import {useNavigate} from "react-router-dom";
import {CREATE_TEST_ROUTE} from "../utils/consts";
import {useDispatch} from "react-redux";
import {setQuestionIndex, setQuestionIndexNull} from "../redux/features/auth/testSlice";

const Account = () => {
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const [field, setField] = useState('')
    const [data, setData] = useState('')
    const [validations, setValidations] = useState({})
    const navigate = useNavigate()

    dispatch(setQuestionIndexNull())


    return (
        <Container>
            <Card className="d-flex justify-content-between flex-row mt-3">
                <Col md={6} className="mx-lg-auto">
                    <UserItem setData={setData} setField={setField} setOpenModal={setOpenModal}
                              setValidations={setValidations}/>
                    <div style={{width: '100%'}} className='d-flex pb-3'>
                        <Button
                            variant={"outline-dark"}
                            className="mt-4 mx-lg-auto"
                            onClick={() => navigate(CREATE_TEST_ROUTE)}
                        >
                            Создать тест
                        </Button>
                    </div>
                </Col>
                <Col md={6}>
                    <MyTestsList/>
                </Col>
            </Card>
            <Col md={12} className="d-flex justify-content-end">
                <EditModal data={data} field={field} open={openModal} onClose={setOpenModal} validations={validations}/>
            </Col>
        </Container>
    );
};

export default Account;