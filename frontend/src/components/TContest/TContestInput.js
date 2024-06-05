import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import styles from './TContestInput.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

import api from '../../api/api';


const TContestInput = () => {
    const [questionCount, setQuestionCount] = useState(localStorage.getItem('questionCount') || 0);
    const [currentPage, setCurrentPage] = useState(1);
    const [homeworkName, setHomeworkName] = useState("");
    const [pdfFile, setPdfFile] = useState(null);
    const [testCases, setTestCases] = useState([{ testCase: "", testCaseAnswer: "" }]);

    const [homeworks, setHomeworks] = useState(
        new Array(questionCount).fill({
            homeworkName: "",
            pdfFile: null,
            testCases: [{ testCase: "", testCaseAnswer: "" }],
        })
    );

    const [pdfFiles, setPdfFiles] = useState([]);

    const location = useLocation();
    const contestName = location.state?.contestName;
    const startTime = location.state?.startTime;
    const endTime = location.state?.endTime;
    const navigate = useNavigate();

    useEffect(() => {
        const initialHomeworks = new Array(questionCount).fill({
            homeworkName: "",
            testCases: [{ testCase: "", testCaseAnswer: "" }],
            startTime: "",
            endTime: "",
            average: 0,
            pdfUrl: "",
            pdf: null
        });
        setHomeworks(initialHomeworks);
    }, [questionCount]);

    useEffect(() => {
        const initialPdfFiles = new Array(questionCount).fill(null);
        setPdfFiles(initialPdfFiles);
    }, [questionCount]);


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

    const handleTestCaseFileChange = async (e, index) => {
        const file = e.target.files[0];
        const content = await readFileContent(file);
        console.log(index);
        setHomeworks(prevHomeworks => {
            const updatedHomeworks = [...prevHomeworks];
            if (!updatedHomeworks[currentPage - 1]) {
                updatedHomeworks.push({
                    homeworkName: "",
                    pdfFile: null,
                    testCases: [{ testCase: "", testCaseAnswer: "" }]
                })
            }

            var newTestCases = [...updatedHomeworks[currentPage - 1].testCases];
            console.log(newTestCases);
            // 如果在這個索引位置沒有測試用例，則新增一個
            if (!newTestCases[index]) {
                newTestCases.push({ testCase: content, testCaseAnswer: "" });
            } else {
                // 如果測試用例已存在，則更新它
                newTestCases[index].testCase = content;
            }

            setTestCases(newTestCases);
            updatedHomeworks[currentPage - 1].testCases = newTestCases;
            return updatedHomeworks;
        });
    };

    const handleTestCaseAnsFileChange = async (e, index) => {
        const file = e.target.files[0];
        const content = await readFileContent(file);

        setHomeworks(prevHomeworks => {
            const updatedHomeworks = [...prevHomeworks];
            if (!updatedHomeworks[currentPage - 1]) {
                updatedHomeworks.push({
                    homeworkName: "",
                    pdfFile: null,
                    testCases: [{ testCase: "", testCaseAnswer: "" }]
                })
            }

            const newTestCases = [...updatedHomeworks[currentPage - 1].testCases];

            if (!newTestCases[index]) {
                newTestCases.push({ testCase: "", testCaseAnswer: content });
            } else {
                newTestCases[index].testCaseAnswer = content;
            }


            setTestCases(newTestCases);
            updatedHomeworks[currentPage - 1].testCases = newTestCases;
            return updatedHomeworks;
        });
    };


    const handleNextPage = () => {

        // Check if files have been selected
        if (!pdfFile) {
            alert("請選擇PDF文件！");
            return;
        }


        const testCasesArray = testCases.map(item => item.testCase);
        const testCasesAnswerArray = testCases.map(item => item.testCaseAnswer);

        const newHomework = {
            homeworkName: homeworkName,
            testCase: testCasesArray,  // Using the array of testCases
            testCaseAnswer: testCasesAnswerArray,  // Using the array of testCaseAnswers
            startTime: startTime,
            endTime: endTime,
            average: 0,
            pdfUrl: null,
            pdf: null,
            contestOrNot: true
        };


        setHomeworks(prevHomeworks => {
            const updatedHomeworks = [...prevHomeworks];
            updatedHomeworks[currentPage - 1] = newHomework;
            return updatedHomeworks;
        });


        setPdfFiles(prevPdfFiles => {
            const updatedPdfFiles = [...prevPdfFiles];
            updatedPdfFiles[currentPage - 1] = pdfFile;
            return updatedPdfFiles;
        });

        if (currentPage < questionCount) {
            setCurrentPage(prevPage => {
                return prevPage + 1;
            });

        }
        else {

            const updatedHomeworks = [...homeworks];
            updatedHomeworks[currentPage - 1] = newHomework;

            const updatedPdfFiles = [...pdfFiles];
            updatedPdfFiles[currentPage - 1] = pdfFile;

            console.log(updatedHomeworks)
            console.log(updatedPdfFiles)

            const contestData = {
                id: 1,  // replace with actual data
                contestname: contestName,  // replace with actual data
                totalscore: 100,  // replace with actual data
                averagescore: 90,  // replace with actual data
                startTime: startTime,  // replace with actual data
                endTime: endTime,  // replace with actual data
                homeworks: updatedHomeworks
            };

            console.log(contestData);
            // Call the API to add the new contest
            api.addContest(contestData, updatedPdfFiles)
                .then(result => {
                    if (result) {
                        alert("File uploaded successfully."); // Show a success message
                        // Contest added successfully, navigate to the contest route
                        navigate("/tcontest");

                    } else {
                        // Handle error
                        alert("File uploaded failed."); // Show a success message
                    }
                });
        }

        // Reset UI-related states after the page number is changed
        setHomeworkName("");
        setPdfFile(null);
        setTestCases([{ testCase: "", testCaseAnswer: "" }]);

    };


    return (
        <Container className={styles.contestContainer}>
            <Row >
                <NavbarLogo />
            </Row>
            <Row className={`${styles.navigationRow} `} >
                <Col className={styles.navigationContainer}>
                    <Navbar />
                </Col>
            </Row>
            <Row className={styles.sectionContainer}>
                <Col lg={4} className="text-center">
                    <h2>題目</h2>
                </Col>
                <Col>
                    <h2>{currentPage}/{questionCount}</h2>
                </Col>
            </Row>

            <Row className={styles.sectionContainer}>
                <Col lg={7} className="text-center">
                    <h2>題目名稱</h2>
                </Col>
                <Col lg={3}>
                    <Form.Control type="text" placeholder="輸入題目名稱" value={homeworkName} onChange={(e) => setHomeworkName(e.target.value)} />
                </Col>
            </Row>


            <Row>
                <Form className={styles.sectionContainer}>
                    <Form.Group className="mb-3" controlId="formPDFUpload" as={Row} >
                        <Form.Label column sm={7}>
                            PDF匯入處
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control type="file" accept=".pdf" value={pdfFile ? undefined : ""} onChange={handlePdfFileChange} />
                        </Col>
                    </Form.Group>

                    {testCases.map((item, index) => (
                        <>
                            <Form.Group className="mb-3" controlId={`formTestDataUpload${index}`} as={Row}>
                                <Form.Label column sm={7}>
                                    隱藏測資{index + 1}
                                </Form.Label>
                                <Col sm={3}>
                                    <Form.Control type="file" accept=".txt" value={pdfFile ? undefined : ""} onChange={(e) => handleTestCaseFileChange(e, index)} />
                                </Col>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId={`formTestAnswerUpload${index}`} as={Row}>
                                <Form.Label column sm={7}>
                                    隱藏測資答案{index + 1}
                                </Form.Label>
                                <Col sm={3}>
                                    <Form.Control type="file" accept=".txt" value={pdfFile ? undefined : ""} onChange={(e) => handleTestCaseAnsFileChange(e, index)} />
                                </Col>
                            </Form.Group>
                        </>
                    ))}



                    <Button onClick={() => setTestCases([...testCases, { testCase: "", testCaseAnswer: "" }])}>+</Button>
                    {currentPage === questionCount ?
                        <Button onClick={() => navigate("")}>End</Button> :
                        <Button className="mx-5" onClick={handleNextPage}>Next</Button>
                    }
                </Form>
            </Row>

        </Container >
    );
};

export default TContestInput;
