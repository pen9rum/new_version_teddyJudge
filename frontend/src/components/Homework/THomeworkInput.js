// THomeworkPage.js

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './THomeworkInput.module.css';
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import { useNavigate } from "react-router-dom";

import api from '../../api/api';

const THomeworkInput = () => {
    const [homeworkName, setHomeworkName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [pdfFile, setPdfFile] = useState(null);
    const [testCases, setTestCases] = useState([{ testCase: "", testCaseAnswer: "" }]);

    const navigate = useNavigate();


    const readFileContent = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = event => resolve(event.target.result);
            reader.onerror = error => reject(error);
            reader.readAsText(file);
        });
    };

    const handlePdfFileChange = async (e) => {
        const file = e.target.files[0];
        setPdfFile(file);
    };

    const handleTestCaseFileChange = async (e, index) => {
        const file = e.target.files[0];
        const content = await readFileContent(file);

        const newTestCases = [...testCases];
        newTestCases[index].testCase = content;
        setTestCases(newTestCases);
    };

    const handleTestCaseAnsFileChange = async (e, index) => {
        const file = e.target.files[0];
        const content = await readFileContent(file);

        const newTestCases = [...testCases];
        newTestCases[index].testCaseAnswer = content;
        setTestCases(newTestCases);
    };

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();


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
        if (!pdfFile) {
            alert("請選擇PDF文件！");
            return;
        }


        if (!testCases[0].testCase || !testCases[0].testCaseAnswer) {
            alert(`請為隱藏測資 ${1} 選擇文件！`);
            return;
        }

        const allTestCases = testCases.map(tc => tc.testCase);
        const allTestCaseAnswers = testCases.map(tc => tc.testCaseAnswer);

        let formData = new FormData();
        formData.append("pdfFile", pdfFile);
        formData.append("homework", JSON.stringify({
            homeworkName,
            startTime,
            endTime,
            testCase: allTestCases,
            testCaseAnswer: allTestCaseAnswers,
            average: 0.0, // assuming this is a static value
            pdfUrl: "", // assuming this is a static value
            pdf: null,
            contestOrNot: false
        }));

        try {
            const response = await api.post("/homework/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.status === 201) {
                console.log("File uploaded successfully.");
                alert("File uploaded successfully."); // Show a success message
                navigate(-1); // Go back to the previous page
            } else {
                console.error('File upload failed: ', response);
            }
        } catch (error) {
            console.error('File upload failed: ', error);
        }
    };


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


                <Form className={styles.sectionContainer} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formHomeworkName" as={Row}>
                        <Form.Label column sm={7}>
                            作業名稱
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control type="text" onChange={(e) => setHomeworkName(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStartTime" as={Row}>
                        <Form.Label column sm={7} >
                            開始時間
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control type="datetime-local" onChange={(e) => setStartTime(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEndTime" as={Row}>
                        <Form.Label column sm={7}>
                            結束時間
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control type="datetime-local" onChange={(e) => setEndTime(e.target.value)} />
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


                    {testCases.map((item, index) => (
                        <>
                            <Form.Group className="mb-3" controlId={`formTestDataUpload${index}`} as={Row}>
                                <Form.Label column sm={7}>
                                    隱藏測資 {index + 1}
                                </Form.Label>
                                <Col sm={3}>
                                    <Form.Control type="file" accept=".txt" onChange={(e) => handleTestCaseFileChange(e, index)} />
                                </Col>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId={`formTestAnswerUpload${index}`} as={Row}>
                                <Form.Label column sm={7}>
                                    隱藏測資答案 {index + 1}
                                </Form.Label>
                                <Col sm={3}>
                                    <Form.Control type="file" accept=".txt" onChange={(e) => handleTestCaseAnsFileChange(e, index)} />
                                </Col>
                            </Form.Group>
                        </>
                    ))}
                    <Button onClick={() => setTestCases([...testCases, { testCase: "", testCaseAnswer: "" }])}>+</Button>

                    <Row>
                        <Col className="d-flex justify-content-end align-items-end ">
                            <Button className="mt-5 mb-5" variant="primary" type="submit">
                                提交
                            </Button>
                        </Col>
                    </Row>

                </Form>
            </Row>



        </Container >
    );
};

export default THomeworkInput;
