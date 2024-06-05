import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './ResultPage.css'
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/api';

const ResultPage = () => {
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
            console.log(homeworkTitle, id);
            const scoreData = await api.getStudentScoreById(homeworkTitle, id);

            if (scoreData && scoreData.length) {
                let totalScore = scoreData.reduce((a, b) => a + b, 0);
                if (totalScore == 99 || totalScore > 100) {
                    totalScore = 100;
                }
                setScore(totalScore);
            } else {
                console.log("what");
            }

            const resultData = await api.getStudentResultById(homeworkTitle, id);
            console.log(resultData);
            if (resultData) {
                const resultArray = resultData.split('\n');  // 新增這一行
                setResult(resultArray);  // 修改這一行
            }
        }

        fetchData();
    }, [homeworkTitle, id]);


    return (
        <Container className="result-page-container">
            <Row>
                <NavbarLogo />
            </Row>
            <Row className="navigation-row">
                <Col className="navigation-container">
                    <Navbar />
                </Col>
            </Row>

            <Row className="row-width-70em">
                <Col className="d-flex justify-content-center">
                    <h1>{homeworkTitle}</h1>
                </Col>
                <Col className="d-flex justify-content-center">
                    <h1>
                        <span className={score === 100 ? "black" : "red-90"}>
                            {score}
                        </span>
                        /100
                    </h1>
                </Col>
            </Row>


            <Row className="row-width-70em">
                <Col className="d-flex justify-content-start">
                    <h3>
                        結果
                    </h3>
                </Col>
            </Row>
            <Row className="row-width-70em">
                <Col className="label-deduct-points text-start">
                    <label htmlFor="exampleInput">
                        <ul className="mt-3">
                            {result && result.map((line, index) => <li key={index}>{line}</li>)}
                        </ul>
                    </label>
                </Col>
            </Row>

            <Row className="row-width-70em">
                <Col className="mt-5 d-flex justify-content-end">
                    <Button onClick={() => navigate(-1)}>Back</Button>

                </Col>
            </Row>
        </Container>
    );
};

export default ResultPage;
