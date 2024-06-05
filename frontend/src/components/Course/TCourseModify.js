import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import styles from './TCourseModify.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/api';

const TCourseModify = () => {
    const [homeWorkTitle, setHomeWorkTitle] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [pdfFile, setPdfFile] = useState(null);
    const [testCase, setTestCase] = useState("");
    const [testCaseAnswer, setTestCaseAnswer] = useState("");
    const [testCases, setTestCases] = useState([]);
    const [testCaseAnswers, setTestCaseAnswers] = useState([]);
    const [isContext, setIsContext] = useState(true);




    const handlePdfFileChange = async (e) => {
        const file = e.target.files[0];
        setPdfFile(file);
    };

    const readFileContent = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = event => resolve(event.target.result);
            reader.onerror = error => reject(error);
            reader.readAsText(file);
        });
    };


    const handleTestCaseFileChange = async (index, e) => {
        const file = e.target.files[0];
        const content = await readFileContent(file);
        setTestCase({ index, content });
    };

    const handleTestCaseAnsFileChange = async (index, e) => {
        const file = e.target.files[0];
        const content = await readFileContent(file);
        setTestCaseAnswer({ index, content });
    };

    const handleTestCaseUpdate = (index) => {
        api.updateTestCase(homeWork, testCase.content, testCase.index)
            .then(success => alert(success ? 'Test case update successful' : 'Test case update failed'))
            .catch(error => alert('Error updating Test case: ' + error));
    };

    const handleTestCaseAnswerUpdate = (index) => {
        api.updateTestCaseAnswer(homeWork, testCaseAnswer.content, testCaseAnswer.index)
            .then(success => alert(success ? 'Test case answer update successful' : 'Test case answer update failed'))
            .catch(error => alert('Error updating Test case answer: ' + error));
    };


    const handleStartTimeUpdate = () => {

        // Check if the start time is later than the end time
        if (new Date(startTime) > new Date(endTime)) {
            alert("開始時間不能晚於結束時間！");
            return; // Stop execution
        }


        api.updateHomeworkStartTime(homeWork, startTime)
            .then(success => alert(success ? 'Start time update successful' : 'Start time update failed'))
            .catch(error => alert('Error updating start time: ' + error));
    };

    const handleEndTimeUpdate = () => {

        // Check if the start time is later than the end time
        if (new Date(startTime) > new Date(endTime)) {
            alert("開始時間不能晚於結束時間！");
            return; // Stop execution
        }


        api.updateHomeworkEndTime(homeWork, endTime)
            .then(success => alert(success ? 'End time update successful' : 'End time update failed'))
            .catch(error => alert('Error updating end time: ' + error));
    };

    const handlePDFUpdate = () => {
        api.updateHomeworkPDF(homeWork, pdfFile)
            .then(success => alert(success ? 'PDF update successful' : 'PDF update failed'))
            .catch(error => alert('Error updating PDF: ' + error));
    }



    const navigate = useNavigate();
    const location = useLocation();
    const homeWork = location.state?.fileTitle;

    useEffect(() => {
        if (homeWork) {
            // Call the function to get homework data
            api.getHomeworkByHomeworkName(homeWork)
                .then(data => {
                    if (data) {
                        console.log(data);
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

                        // Then in your api call
                        setStartTime(formatDate(data.startTime));
                        setEndTime(formatDate(data.endTime));
                        setTestCases(data.testCase);
                        setTestCaseAnswers(data.testCaseAnswer);
                        setIsContext(data.contestOrNot);

                        console.log("Hi" + data.contestOrNot)
                        console.log("Hiii" + isContext)

                        console.log("Hello start time" + startTime);
                    } else {
                        console.log("Failed to fetch homework data for: ", homeWork);
                    }
                })
                .catch(error => {
                    console.error("Error fetching homework data: ", error);
                });
        }
    }, [homeWork, isContext]);


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
                <Col className={styles.sectionContainer}>
                    <h2>{homeWork}</h2>
                </Col>

                <Col>
                    <h2>{homeWorkTitle}</h2>
                </Col>
            </Row>

            <Row>
                <Form className={styles.sectionContainer}>

                    {isContext === false && (
                        <>
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
                        </>
                    )}

                    <Form.Group className="mb-3" controlId="formPDFUpload" as={Row}>
                        <Form.Label column sm={5}>
                            PDF匯入處
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control type="file" accept=".pdf" onChange={handlePdfFileChange} />
                        </Col>
                        <Col sm={4}>
                            <Button variant="primary" type="button" onClick={handlePDFUpdate}>更改</Button>
                        </Col>
                    </Form.Group>
                    {testCases.map((testCase, index) => (
                        <>
                            <Form.Group key={index} className="mb-3" controlId={`formTestDataUpload${index}`} as={Row}>
                                <Form.Label column sm={5}>
                                    隱藏測資 {index + 1}
                                </Form.Label>
                                <Col sm={3}>
                                    <Form.Control type="file" accept=".txt" onChange={(e) => handleTestCaseFileChange(index, e)} />
                                </Col>
                                <Col sm={4}>
                                    <Button variant="primary" type="button" onClick={() => handleTestCaseUpdate(index)}>更改</Button>
                                </Col>
                            </Form.Group>

                            <Form.Group key={index} className="mb-3" controlId={`formTestAnswerUpload${index}`} as={Row}>
                                <Form.Label column sm={5}>
                                    隱藏測資答案 {index + 1}
                                </Form.Label>
                                <Col sm={3}>
                                    <Form.Control type="file" accept=".txt" onChange={(e) => handleTestCaseAnsFileChange(index, e)} />
                                </Col>
                                <Col sm={4}>
                                    <Button variant="primary" type="button" onClick={() => handleTestCaseAnswerUpdate(index)}>更改</Button>
                                </Col>
                            </Form.Group>
                        </>
                    ))}


                </Form>
            </Row>

            <Row>
                <Col className={`${styles.sectionContainer} d-flex justify-content-end align-items-end`}>
                    <Button onClick={() => navigate(-1)}>Return</Button>
                </Col>
            </Row>

        </Container>
    );
};

export default TCourseModify;
