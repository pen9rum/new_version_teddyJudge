import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import styles from './TCoursePage.module.css';
import { useNavigate } from 'react-router-dom';


const TCoursePage = () => {
    const navigate = useNavigate();
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
                <Col>
                    <Row>
                        <Col className={styles.sectionContainer}>
                            <h2>上傳講義</h2>
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
                </Col>

                <Col>
                    <Row>
                        <Col className={styles.sectionContainer}>
                            <h2>講義管理</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={`${styles.sectionContainer} text-center  d-flex justify-content-center align-items-center p-0`}>
                            <Button
                                className={`${styles.btnDetail}`}
                                variant="primary"
                                onClick={() => navigate('courselist')}
                            >
                                Go
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col className={styles.sectionContainer}>
                    <h2>題目管理</h2>
                </Col>
            </Row>
            <Row>
                <Col className={`${styles.sectionContainer} text-center  d-flex justify-content-center align-items-center p-0`}>
                    <Button
                        className={`${styles.btnDetail}`}
                        variant="primary"
                        onClick={() => navigate('list')}
                    >
                        Go
                    </Button>
                </Col>
            </Row>



        </Container>
    );
};

export default TCoursePage;
