import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import styles from './TContestPage.module.css';
import { useNavigate } from 'react-router-dom';


const TContestPage = () => {
    const navigate = useNavigate();
    const [questionCount, setLocalQuestionCount] = useState(0);  // <-- add this
    const [contestName, setContestName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");


    const handleInputChange = (event) => {
        setLocalQuestionCount(event.target.value);  // <-- modify this

    };

    const handleSetQuestionCount = () => {
        localStorage.setItem('questionCount', questionCount);
    };

    const handleNextClick = () => {

        // Check if files have been selected
        if (!startTime || !endTime) {
            alert("請選擇時間");
            return;
        }

        // Check if the start time is later than the end time
        if (new Date(startTime) > new Date(endTime)) {
            alert("開始時間不能晚於結束時間！");
            return; // Stop execution
        }

        // Check if files have been selected
        if (!contestName) {
            alert("請輸入Contest名稱");
            return;
        }

        // Check if files have been selected
        if (questionCount <= 0) {
            alert("請輸入題數");
            return;
        }

        handleSetQuestionCount();
        navigate("input", { state: { contestName, startTime, endTime } });
    };

    return (
        <Container className={styles.contestContainer}>
            <Row >
                <NavbarLogo />
            </Row>
            <Row className={`${styles.navigationRow} `} >
                <Col className={styles.navigationContainer}>
                    <Navbar />
                </Col>
            </Row>
            <Row className={styles.sectionContainer}>
                <Col lg={7} className="text-center">
                    <h2>競賽名稱</h2>
                </Col>
                <Col lg={3}>
                    <Form.Control type="text" placeholder="輸入競賽名稱" onChange={(e) => setContestName(e.target.value)} />
                </Col>
            </Row>



            <Row className={styles.sectionContainer}>
                <Col lg={7} className="text-center">
                    <h2>輸入題數</h2>
                </Col>
                <Col lg={3}>
                    <Form.Control type="number" placeholder="輸入題數" onChange={handleInputChange} />
                </Col>
            </Row>


            <Row>
                <Form className={styles.sectionContainer}>
                    <Form.Group className="mb-3" controlId="formStartTime" as={Row}>
                        <Form.Label column sm={7} >
                            <h2>開始時間</h2>
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control type="datetime-local" onChange={(e) => setStartTime(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEndTime" as={Row}>
                        <Form.Label column sm={7}>
                            <h2>結束時間</h2>
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control type="datetime-local" onChange={(e) => setEndTime(e.target.value)} />
                        </Col>
                    </Form.Group>
                </Form>
            </Row>

            <Row >
                <Col className={styles.sectionContainer}>
                    <Button onClick={() => handleNextClick()}>Next</Button>
                </Col>
            </Row>



        </Container >
    );
};

export default TContestPage;
