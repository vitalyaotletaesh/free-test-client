import React from 'react';
import {Card, Col, Container} from "react-bootstrap";

const Admin = () => {
    return (
        <Container className="d-flex">
            <Col md={6} className="mt-3">
                <Card  border={"light"} className="mx-lg-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </Card>
            </Col>

            <Col md={6} className="mt-3 m-lg-3">
                <Card  border={"light"} className="mx-lg-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Test name</th>
                            <th>Author</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </Card>
            </Col>
        </Container>
    );
};

export default Admin;