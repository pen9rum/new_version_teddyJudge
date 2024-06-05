import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './ScoreContainer.css';
import { Link, useNavigate } from 'react-router-dom';

const ScoreContainer = ({ homeworkTitle, score }) => {
    const navigate = useNavigate();

    return (
        <Container className="score-container">
            <Row className="row-score">
                <Col    >
                    <Row>
                        <Col className="text-start mt-3">
                            <h4 className="mx-3">{homeworkTitle}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center due-date">
                            <h4>
                                <span className={score === 100 ? "" : "red-90"}>
                                    {score}
                                </span>
                                /100
                            </h4>
                        </Col>
                    </Row>

                </Col>



                <Col className=" text-center col-btn-detail d-flex justify-content-end  p-0 ">
                    <Button
                        className="btn-detail"
                        variant="primary"
                        onClick={() => navigate('/result', { state: { homeworkTitle } })}
                    >
                        Detail
                    </Button>
                </Col>

                <Col className="text-center col-btn-detail d-flex justify-content-end p-0 ">
                    <Button
                        className={`btn-submit`}
                        variant="primary"
                        onClick={() => navigate('/problem', { state: { homeworkTitle } })}
                    >
                        Submit
                    </Button>
                </Col>

                <Col className="text-center col-btn-detail d-flex justify-content-end p-0 ">
                    <Button
                        className={`btn-submit`}
                        variant="primary"
                        onClick={() => navigate('/style-check-result', { state: { homeworkTitle } })}
                    >
                        Check
                    </Button>
                </Col>




            </Row>
        </Container>
    );
};

export default ScoreContainer;
