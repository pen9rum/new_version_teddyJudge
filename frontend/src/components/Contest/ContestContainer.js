import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './ContestContainer.module.css';
import { Link, useNavigate } from 'react-router-dom';

const ContestContainer = ({ contestTitle, status, score, contestTotalScore, dueDate, btnStatus }) => {
    const GoStr = 'Go';
    const ReviewStr = 'Review';
    const navigate = useNavigate();

    return (
        <Container className="score-container">
            <Row className="row-score">
                <Col>
                    <Row>
                        <Col className="text-start mt-3">
                            <h4 className="mx-3">{contestTitle}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center  due-date">
                            {status ? (
                                <h4><span className="red-90">{score}</span>/{contestTotalScore}</h4>
                            ) : (
                                <h4> {dueDate}</h4>
                            )}
                        </Col>
                    </Row>

                </Col>



                <Col className=" text-center col-btn-detail d-flex justify-content-end  p-0 ">
                    {btnStatus === 'go' ? (
                        <Button className="btn-detail" variant="primary" onClick={() => navigate(`/contestList/${GoStr}`, { state: { contestTitle } })}>
                            Go
                        </Button>
                    ) : btnStatus === 'review' ? (
                        <Button className="btn-detail" variant="primary" onClick={() => navigate(`/contestList/${ReviewStr}`, { state: { contestTitle } })}>
                            Review
                        </Button>
                    ) : null}
                </Col>





            </Row>
        </Container>
    );
};

export default ContestContainer;
