// THomeworkPage.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './THomeworkPage.module.css';
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import THomeworkContainer from '../Homework/THomeworkContainer';
import api from '../../api/api';

const THomeworkPage = () => {
    const navigate = useNavigate();
    const [homeworkData, setHomeworkData] = useState([
        { title: "HW 1", dueDate: "123" }

    ]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await api.getHomeworkData();
            if (data) {
                const mappedData = data.map(hw => ({
                    title: hw.homeworkName,
                    dueDate: new Date(hw.endTime).toLocaleDateString(),

                }));
                console.log(mappedData);
                setHomeworkData(mappedData);
            }
        }

        fetchData();
    }, []);

    return (
        <Container className={styles.thomeworkPageContainer}>
            <Row>
                <NavbarLogo />
            </Row>
            <Row className="navigation-row">
                <Col className="navigation-container">
                    <Navbar />
                </Col>
            </Row>
            <Row>
                <Col className={styles.sectionContainer}>
                    <h2>上傳新作業</h2>
                </Col>
            </Row>
            <Row>
                <Col className={`${styles.sectionContainer} text-center  d-flex justify-content-center align-items-center p-0`}>
                    <Button
                        className={`${styles.btnDetail}`}
                        variant="primary"
                        onClick={() => navigate('input')}
                    >
                        Go
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className={styles.sectionContainer}>
                    <h2>查看作業狀態</h2>
                    <div className={styles.sectionContent}>
                        {homeworkData.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).map((hw) => (
                            <div className={styles.homeworkWrapper}>
                                <THomeworkContainer homeworkTitle={hw.title} dueDate={hw.dueDate} />
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default THomeworkPage;
