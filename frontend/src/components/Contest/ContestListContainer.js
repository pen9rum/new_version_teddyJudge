import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './ContestListContainer.module.css';


const ContestListContainer = ({ homeworkTitle, result, score, scoreTotal, isAnsOrNot }) => {

    const navigate = useNavigate();


    return (
        <Container className={styles.contestListContainer}>
            <Row>
                <Col className={`text-start mx-3 align-self-center`}>
                    <header>
                        <h4 className="">{homeworkTitle}</h4>
                    </header>
                </Col>
                <Col className={`text-end  align-self-center`}>
                    <h4 className="">{result}</h4>
                </Col>

                <Col className={`text-end  align-self-center`}>
                    <h4 className="">
                        <span
                            className={
                                (score === 100 && scoreTotal === 100) ? `${styles.textBlack}` : `${styles.scoreText}`
                            }
                        >
                            {score}
                        </span> / {scoreTotal}
                    </h4>
                </Col>



                {isAnsOrNot ? (
                    <Col className={`text-center ${styles.colBtnAns} d-flex justify-content-end p-0`}>
                        <Button className={`btn-go ${styles.btnAns}`} variant="primary" onClick={() => navigate('/problem', { state: { homeworkTitle } })}>
                            Ans
                        </Button>
                    </Col>
                ) : (
                    <Col className={`text-center ${styles.colBtnAns} d-flex justify-content-end p-0`}>
                        <Button className={`btn-go ${styles.btnReview}`} variant="primary" onClick={() => navigate(`/contestResult/${homeworkTitle}`, { state: { homeworkTitle } })}>
                            Review
                        </Button>
                    </Col>
                )}

                <Col className={`text-center ${styles.colBtnAns} d-flex justify-content-end p-0`}>
                    <Button className={`btn-go ${styles.btnReview}`} variant="primary" onClick={() => navigate(`/style-check-result`, { state: { homeworkTitle } })}>
                        Check
                    </Button>
                </Col>

            </Row>
        </Container>
    );
};



export default ContestListContainer;
