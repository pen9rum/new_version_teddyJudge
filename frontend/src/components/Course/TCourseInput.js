import React, { useRef, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import styles from './TCourseInput.module.css';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

const TCourseInput = () => {
    const navigate = useNavigate();
    const [pdfFile, setPdfFile] = useState(null);
    const [courseName, setCourseName] = useState("");


    const handlePdfFileChange = async (e) => {
        const file = e.target.files[0];
        setPdfFile(file);
    };


    const submitCourse = async () => {
        const result = await api.addCourse(courseName, pdfFile);
        if (result) {
            alert('Course submitted successfully');
            navigate('/tcourse');
        } else {
            alert('Failed to submit course');
        }
    };



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
                <Form className={styles.sectionContainer}>
                    <Form.Group className="mb-3" controlId="formLectureName" as={Row}>
                        <Form.Label column sm={7}>
                            講義名稱
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control type="text" onChange={(e) => setCourseName(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPDFUpload" as={Row}>
                        <Form.Label column sm={7}>
                            PDF匯入處
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control type="file" accept=".pdf" onChange={handlePdfFileChange} />
                        </Col>
                    </Form.Group>
                </Form>
            </Row>

            <Row  >
                <Col className={`${styles.sectionContainer} d-flex justify-content-end align-items-end`}>
                    <Button variant="primary" onClick={submitCourse}>
                        完成
                    </Button>
                </Col>
            </Row>


        </Container >
    );
};

export default TCourseInput;
