import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './ContestResultContainer.module.css';

const ContestResultContainer = ({ deductionReason, score }) => {

    return (
        <Container className={`${styles.contestResultContainer}`} >
            <Row >
                <Col className="text-start mt-3">
                    <h4 className="mx-3">{deductionReason}</h4>
                </Col>

                <Col className="text-center mt-3">
                    <h4 className={`${styles.textRed}`}>-{score}</h4>
                </Col>
            </Row>
        </Container >
    );
};

export default ContestResultContainer;
