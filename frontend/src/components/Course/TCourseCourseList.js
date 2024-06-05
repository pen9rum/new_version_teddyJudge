import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import styles from './TCourseCourseList.module.css';
import DownloadFileContainer from '../Download/DownloadFileContainer';
import api from '../../api/api';

const TCourseCourseList = () => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await api.getAllCourses();
            setCourses(data);
        }

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

            <Row className={`${styles.rowWidth70em} `}>
                <Col lg={4} className="text-center">
                    <h2>講義</h2>
                </Col>
            </Row>

            <Row className={`${styles.rowWidth70em} `}>
                <Col>
                    {courses.map((course, index) => (
                        <DownloadFileContainer
                            key={index}
                            fileTitle={course.coursename + ".pdf"}

                        />
                    ))}
                </Col>
            </Row>

        </Container >
    );
};

export default TCourseCourseList;
