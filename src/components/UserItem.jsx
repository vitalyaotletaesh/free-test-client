import React, {useState} from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import {useSelector} from "react-redux";
import EditModal from "./modals/EditModal";

const UserItem = ({setData, setField, setOpenModal, setValidations}) => {
    const user = useSelector((state) => state.auth.user)

    const handleModal = (field, data, validations) => {
        setOpenModal(true)
        setField(field)
        setData(data)
        setValidations(validations)
    }

    return (
        <>

            <Col className="mt-3 m-5">
                <h2 className="text-center">Ваши данные</h2>
                <Card border={"light"} className="mx-lg-auto mt-4">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>{user.username}</th>
                            <th>
                                <Button
                                    variant={"outline-success"}
                                    className="mt-3"
                                    onClick={() => handleModal("Username", user.username, {isEmpty: true, minLength: 5})}
                                >
                                    Редактировать
                                </Button>
                            </th>
                        </tr>
                        </thead>

                        <thead>
                        <tr>
                            <th>Email</th>
                            <th>{user.email}</th>
                            <th>
                                <Button
                                    variant={"outline-success"}
                                    className="mt-3"
                                    onClick={() => handleModal("Email", user.email, {isEmpty: true, minLength: 4, isEmail: true})}
                                >
                                    Редактировать
                                </Button>
                            </th>
                        </tr>
                        </thead>

                        <thead>
                        <tr>
                            <th>Password</th>
                            <th>Ваш пароль</th>
                            <th>
                                <Button
                                    variant={"outline-success"}
                                    className="mt-3"
                                    onClick={() => handleModal("Пароль", {isEmpty: true, minLength: 5, maxLength: 10})}
                                >
                                    Редактировать
                                </Button>
                            </th>
                        </tr>
                        </thead>
                    </table>
                </Card>
            </Col>
        </>
    );
};

export default UserItem;