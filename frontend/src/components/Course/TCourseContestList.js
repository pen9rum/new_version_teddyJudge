import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import styles from './TCourseContestList.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import TCourseListContainer from './TCourseListContainer';
import api from '../../api/api';

const TCourseContestList = () => {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const location = useLocation();
    const contestTitle = location.state?.fileTitle;
    const [data, setData] = useState([
        { id: 1, title: "Sample title 1" },
        { id: 2, title: "Sample title 2" },
        { id: 3, title: "Sample title 3" }
    ]);


    const handleStartTimeUpdate = () => {
        // Check if the start time is later than the end time
        if (new Date(startTime) > new Date(endTime)) {
            alert("開始時間不能晚於結束時間！");
            return; // Stop execution
        }


        api.updateContestStartTime(contestTitle, startTime)
            .then(success => alert(success ? 'Start time update successful' : 'Start time update failed'))
            .catch(error => alert('Error updating start time: ' + error));
    };

    const handleEndTimeUpdate = () => {

        // Check if the start time is later than the end time
        if (new Date(startTime) > new Date(endTime)) {
            alert("開始時間不能晚於結束時間！");
            return; // Stop execution
        }


        api.updateContestEndTime(contestTitle, endTime)
            .then(success => alert(success ? 'End time update successful' : 'End time update failed'))
            .catch(error => alert('Error updating end time: ' + error));
    };

    useEffect(() => {
        const fetchData = async () => {
            let contestData = await api.getContestByName(contestTitle);
            if (contestData && contestData.homeworks) {
                const homeworkNames = contestData.homeworks.map(homework => homework.homeworkName);
                contestData = { ...contestData, homeworkNames };
            }
            setData(contestData);


            const formatDate = (date) => {
                let d = new Date(date);
                let month = '' + (d.getMonth() + 1);
                let day = '' + d.getDate();
                let year = d.getFullYear();
                let hour = d.getHours();
                let minute = d.getMinutes();

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;
                if (hour < 10)
                    hour = '0' + hour;
                if (minute < 10)
                    minute = '0' + minute;

                return [year, month, day].join('-') + 'T' + [hour, minute].join(':');
            }

            setStartTime(formatDate(contestData.startTime));
            console.log(startTime);
            setEndTime(formatDate(contestData.endTime));
        };

        fetchData();
    }, [contestTitle]);

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
                <Col className={` ${styles.sectionContainer} d-flex justify-content-start align-items-start`}>
                    <h2>{contestTitle}</h2>
                </Col>
            </Row>


            <Row>
                <Form className={styles.sectionContainer}>
                    <Form.Group className="mb-3" controlId="formStartTime" as={Row}>
                        <Form.Label column sm={5} >
                            開始時間
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        </Col>
                        <Col sm={4}>
                            <Button variant="primary" type="button" onClick={handleStartTimeUpdate}>更改</Button>
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEndTime" as={Row}>
                        <Form.Label column sm={5}>
                            結束時間
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                        </Col>
                        <Col sm={4}>
                            <Button variant="primary" type="button" onClick={handleEndTimeUpdate}>更改</Button>
                        </Col>
                    </Form.Group>



                </Form>
            </Row>



            <Row>
                <Col className={styles.sectionContainer}>
                    {data.homeworkNames && data.homeworkNames.map((homeworkName, index) => (
                        <TCourseListContainer key={index} fileTitle={homeworkName} nextRouter={"/tcourse/modify"} />
                    ))}
                </Col>
            </Row>

        </Container >
    );
};

export default TCourseContestList;
