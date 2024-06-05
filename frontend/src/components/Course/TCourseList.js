import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import styles from './TCourseList.module.css';
import { useNavigate } from 'react-router-dom';
import TCourseListContainer from './TCourseListContainer';
import api from '../../api/api';

const TCourseList = () => {
    const navigate = useNavigate();

    const [homeworkData, setHomeworkData] = useState([]);
    const [contestData, setContestData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const homeworkData = await api.getHomeworkData();
            const contestData = await api.getContestData();

            console.log(contestData);
            setHomeworkData(homeworkData || []);
            setContestData(contestData || []);
        };

        fetchData();
    }, []);

    return (
        <Container className={styles.courseContainer}>
            <Row >
                <NavbarLogo />
            </Row>
            <Row className={`${styles.navigationRow} `} >
                <Col className={styles.navigationContainer}>
                    <Navbar />
                </Col>
            </Row>

            <Row>
                <Col className={`${styles.sectionContainer} d-flex justify-content-start`}>
                    <h2>HW</h2>
                </Col>
            </Row>

            <Row>
                <Col className={styles.sectionContainer}>
                    {homeworkData.map((hw, i) => (
                        <TCourseListContainer key={i} fileTitle={hw.homeworkName} nextRouter={`/tcourse/modify`} />
                    ))}
                </Col>
            </Row>

            <Row>
                <Col className={`${styles.sectionContainer} d-flex justify-content-start`}>
                    <h2>Contest</h2>
                </Col>
            </Row>

            <Row>
                <Col className={styles.sectionContainer}>
                    {contestData.map((contest, i) => (
                        <TCourseListContainer key={i} fileTitle={contest.contestname} nextRouter={`/tcourse/contestlist`} />
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default TCourseList;
