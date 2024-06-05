import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import styles from './ContestResultPage.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import ContestResultContainer from './ContestResultContainer'
import api from '../../api/api';

const ContestResultPage = () => {

    const [sourceCode, setSourceCode] = useState(null);
    const [blobUrl, setBlobUrl] = useState(null);
    const { id } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const homeworkName = location.state.homeworkTitle;

    const handleBack = () => {
        navigate(-1);
    };

    // State for the score
    const [score, setScore] = useState(0);
    // State for the result
    const [result, setResult] = useState(null);

    // Fetch the score and result when the component is rendered
    useEffect(() => {
        async function fetchData() {
            console.log(homeworkName, id);
            const scoreData = await api.getStudentScoreById(homeworkName, id);

            if (scoreData && scoreData.length) {
                const totalScore = scoreData.reduce((a, b) => a + b, 0);
                setScore(totalScore);
            } else {
            }

            const resultData = await api.getStudentResultById(homeworkName, id);
            console.log(resultData);
            if (resultData) {
                const resultArray = resultData.split('\n');  // 新增這一行
                setResult(resultArray);  // 修改這一行
            }


        }

        fetchData();
    }, [homeworkName, id]);

    useEffect(() => {
        const fetchSourceCode = async () => {
            const sourceCode = await api.getStudentSourceCodeById(homeworkName, id); // replace id with the correct one
            setSourceCode(sourceCode);
            const blob = new Blob([sourceCode], { type: "text/plain;charset=utf-8" });
            setBlobUrl(URL.createObjectURL(blob));
        };
        fetchSourceCode();
    }, [homeworkName, id]); // replace id with the correct one

    async function downloadPDF(hwTitle) {
        try {
            const response = await api.get(`/homework/${hwTitle}/pdf`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${hwTitle}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Download failed:", error);
        }
    }


    return (
        <Container className={styles.contestResultContainer}>
            <Row >
                <NavbarLogo />
            </Row>
            <Row className={`${styles.navigationRow}`} >
                <Col className={styles.navigationContainer}>
                    <Navbar />
                </Col>
            </Row>
            <Row className={`${styles.rowWidth70em} `}>
                <Col lg={4} className="text-start mx-5">
                    <h2>{homeworkName}</h2>
                </Col>

                <Col>
                    <h2>{score}/100</h2>
                </Col>
            </Row>

            <Row className={`${styles.rowWidth70em} `}>
                <Col lg={4} className="text-start mx-5">
                    <Button onClick={() => downloadPDF(homeworkName)} >
                        Download PDF
                    </Button>
                </Col>

                <Col>
                    <Button className={`${styles.btnGo}`} variant="primary">
                        <a className={`${styles.btnGoa}`} href={blobUrl} download={`${homeworkName}.txt`}>
                            Your code
                        </a>
                    </Button>
                </Col>
            </Row>
            <Row className="row-width-70em">
                <Col className="d-flex justify-content-start">
                    <h3>
                        結果
                    </h3>
                </Col>
            </Row>
            <Row className="row-width-70em">
                <Col className="label-deduct-points text-start">
                    <label htmlFor="exampleInput">
                        <ul className="mt-3">
                            {result && result.map((line, index) => <li key={index}>{line}</li>)}
                        </ul>
                    </label>
                </Col>
            </Row>

            <Row className={`${styles.rowWidth70em}`}>
                <Col lg={9} className="text-end mt-3">
                    <Button variant="primary" onClick={handleBack}>
                        Return
                    </Button>
                </Col>
            </Row>

        </Container>
    );
};

export default ContestResultPage;
