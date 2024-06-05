import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './THomeworkContainer.module.css';
import PropTypes from 'prop-types';

// A reusable homework container component with a title, due date, and navigation button
const THomeworkContainer = ({ homeworkTitle, dueDate }) => {
    const navigate = useNavigate();
    return (
        <Container className={styles.homeworkContainer}>
            <Row>
                <Col lg={9}>
                    <Row className="mt-3">
                        <Col className={`text-start ${styles.homeworkTitle}`}>
                            <header>
                                <h4 className="mx-3">{homeworkTitle}</h4>
                            </header>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-start ">
                            <h4 className="mx-3">Due</h4>
                        </Col>
                        <Col className={`text-end  ${styles.dueDate}`}>
                            <h4 className="mx-3">{dueDate}</h4>
                        </Col>
                    </Row>
                </Col>



                <Col lg={1} className={`text-center ${styles.colBtnGo} d-flex justify-content-end p-0`}>
                    <Button
                        className={`btn-go ${styles.btnGo}`}
                        variant="primary"
                        onClick={() => navigate('detail', { state: { homeworkTitle } })}
                    >
                        Go
                    </Button>
                </Col>

                <Col lg={1} className={`text-center ${styles.colBtnGo} d-flex justify-content-end p-0`}>
                    <Button
                        className={`btn-go ${styles.btnGo}`}
                        variant="primary"
                        onClick={() => navigate('/leaderBoardHomework', { state: { homeworkTitle } })}
                    >
                        Rank
                    </Button>
                </Col>

            </Row>
        </Container>
    );
};

// Define propTypes for better maintainability and error checking
THomeworkContainer.propTypes = {
    homeworkTitle: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
};

export default THomeworkContainer;