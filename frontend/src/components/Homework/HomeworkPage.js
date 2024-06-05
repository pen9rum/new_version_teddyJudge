import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Container, Row, Col } from 'react-bootstrap';
import './HomeworkPage.css';
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import HomeworkContainer from '../Homework/HomeworkContainer';
import ScoreContainer from '../Score/ScoreContainer';
import api from '../../api/api';


const HomeworkPage = () => {
    const [currentHomeworks, setCurrentHomeworks] = useState([]);
    const [lateHomeworks, setLateHomeworks] = useState([]);
    const { id } = useContext(AuthContext);
    const [scores, setScores] = useState([]);

    const formatDateTime = (date) => {
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // add 1 because months are 0-indexed
        const day = date.getUTCDate().toString().padStart(2, '0');
        const hour = date.getUTCHours().toString().padStart(2, '0');
        const minute = date.getUTCMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}`;
    };

    useEffect(() => {

        console.log(id);

        const fetchData = async () => {
            const allHomeworks = await api.getHomeworkData();
            const now = new Date();
            const ongoingHomeworks = [];
            const overdueHomeworks = [];
            const scoredHomeworks = [];

            for (let homework of allHomeworks) {
                const startTime = new Date(homework.startTime);
                const endTime = new Date(homework.endTime);
                const result = await api.getStudentResultById(homework.homeworkName, id);

                if (startTime <= now && now <= endTime) {
                    // This homework is ongoing
                    ongoingHomeworks.push(homework);
                } else if (now > endTime) {
                    // This homework is overdue

                    // This homework has result content, so it is in the "scoredHomeworks" category
                    const score = await api.getStudentScoreById(homework.homeworkName, id);
                    homework.totalScore = score.reduce((a, b) => a + b, 0);
                    if (homework.totalScore == 99 || homework.totalScore > 100) {
                        homework.totalScore = 100
                    }
                    scoredHomeworks.push(homework);

                    if (homework.totalScore !== 100) {
                        // This homework has no result content, so it is in the "overdueHomeworks" category
                        overdueHomeworks.push(homework);
                    }
                }
            }

            setCurrentHomeworks(ongoingHomeworks);
            setLateHomeworks(overdueHomeworks);
            setScores(scoredHomeworks); // This is now the list of homeworks with result content
        };
        fetchData();

    }, []);


    return (
        <Container className="homework-page-container">
            <Row>
                <NavbarLogo />
            </Row>
            <Row className="navigation-row">
                <Col className="navigation-container">
                    <Navbar />
                </Col>
            </Row>
            <Row>
                <Col className="section-container">
                    <h2>當期作業</h2>
                    <div className="section-content">
                        <div className="homework-wrapper">
                            {currentHomeworks.map((homework) => {
                                const endTime = new Date(homework.endTime);
                                const formattedEndTime = formatDateTime(endTime);
                                return (
                                    <HomeworkContainer
                                        key={homework.homeworkName}
                                        homeworkTitle={homework.homeworkName}
                                        dueDate={formattedEndTime}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="section-container">
                    <h2>需補作業</h2>
                    <div className="section-content">
                        <div className="homework-wrapper">
                            {lateHomeworks.map((homework) => {
                                const endTime = new Date(homework.endTime);
                                const formattedEndTime = formatDateTime(endTime);
                                return (
                                    <HomeworkContainer
                                        key={homework.homeworkName}
                                        homeworkTitle={homework.homeworkName}
                                        dueDate={formattedEndTime}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="section-container">
                    <h2>成績查看</h2>
                    <div className="section-content">
                        <div className='score-wrapper'>
                            {scores.map((score) => (
                                <ScoreContainer homeworkTitle={score.homeworkName} score={score.totalScore} />
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default HomeworkPage;
