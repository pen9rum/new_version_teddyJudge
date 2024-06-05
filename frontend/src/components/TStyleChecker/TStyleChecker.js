import Navbar from '../Navbar/Navbar';
import styles from './TStyleChecker.module.css'
import NavbarLogo from '../Navbar/NavbarLogo';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TStyleChecker = () => {
    const [homeworkName, setHomeworkName] = useState('');
    const [numberCheckings, setNumberCheckings] = useState(0);
    const navigate = useNavigate();

    const handleNextBtnClick = (e) => {
        navigate("input", { state: { homeworkName, numberCheckings } });
    }

    return (
        <>
            <Container className={styles.styleCheckerPageContainer}>
                <Row>
                    <NavbarLogo />
                </Row>
                <Row className={styles.navigationRow}>
                    <Col className={styles.navigationContainer}>
                        <Navbar />
                    </Col>
                </Row>
                <Row className={`${styles.rowWidth70em} ${styles.titleRow} `}>
                    <Col md={3} >
                        <h1>Style Checker</h1>
                    </Col>
                </Row>
                <Row className={`${styles.rowWidth70em} `}>
                    <Col lg={3}>
                        <h2> HW-name :</h2>
                    </Col>

                    <Col lg={3}>
                        <Form.Control type="text" onChange={(e) => setHomeworkName(e.target.value)} />
                    </Col>
                </Row>

                <Row className={`${styles.rowWidth70em} `}>
                    <Col lg={5}>
                        <h2> Numbers For Checking :</h2>
                    </Col>

                    <Col lg={3}>
                        <Form.Control type="number" onChange={(e) => setNumberCheckings(e.target.value)} />
                    </Col>
                </Row>


                <Row className={`${styles.rowWidth70em} justify-content-end `}>
                    <Col lg={3} >
                        <Button onClick={(e) => handleNextBtnClick(e)}>Next</Button>
                    </Col>
                </Row>

            </Container >

        </>
    );
};

export default TStyleChecker;
