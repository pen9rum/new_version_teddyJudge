import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './StyleCheckResultPage.module.css'
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/api';

const StyleCheckResultPage = () => {
    const { id } = useContext(AuthContext);
    const location = useLocation();
    const { homeworkTitle } = location.state;
    const navigate = useNavigate();

    // State for the score
    const [score, setScore] = useState(0);
    // State for the result
    const [result, setResult] = useState(null);

    // Fetch the score and result when the component is rendered
    useEffect(() => {
        async function fetchData() {

            const scoreData = await api.getStudentScoreById(homeworkTitle, id);

            if (scoreData && scoreData.length) {
                let totalScore = scoreData.reduce((a, b) => a + b, 0);
                if (totalScore == 99 || totalScore > 100) {
                    totalScore = 100;
                }
                setScore(totalScore);
            }

            const resultData = await api.getStudentStyleCheckResultById(homeworkTitle, id);
            let results = [];
            for (let i = 0; i < resultData.length; i++) {
                results.push(resultData[i]);
            }
            setResult(results);

        }

        fetchData();
    }, [homeworkTitle, id]);


    return (
        <Container className={styles.resultPageContainer}>
            <Row>
                <NavbarLogo />
            </Row>
            <Row className={styles.navigationRow}>
                <Col className="navigation-container">
                    <Navbar />
                </Col>
            </Row>

            <Row className={styles.rowWidth70em}>
                <Col className="d-flex justify-content-center">
                    <h1>{homeworkTitle}</h1>
                </Col>
                <Col className="d-flex justify-content-center">
                    <h1>
                        <span className={score === 100 ? "black" : styles.redText}>
                            {score}
                        </span>
                        /100
                    </h1>
                </Col>
            </Row>


            <Row className={styles.rowWidth70em}>
                <Col className="d-flex justify-content-start">
                    <h3>
                        結果
                    </h3>
                </Col>
            </Row>
            <Row className={styles.rowWidth70em}>
                <Col className="label-deduct-points text-start">
                    <label htmlFor="exampleInput">
                        <ul className="mt-3">
                            {result && result.length > 0 ? result.map((line, index) => {
                                // 检查该行是否以 "Not" 开头
                                const isNot = line.split(' ')[0] === 'Not';

                                // 如果是，则为这一行设置一个特殊的样式
                                return <li key={index} className={isNot ? styles.redText : ''}>{line}</li>
                            }) : <li>Haven't submit</li>}


                        </ul>
                    </label>
                </Col>
            </Row>

            <Row className={styles.rowWidth70em}>
                <Col className="mt-5 d-flex justify-content-end">
                    <Button onClick={() => navigate(-1)}>Back</Button>

                </Col>
            </Row>
        </Container>
    );
};

export default StyleCheckResultPage;
