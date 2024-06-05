// ProblemPage.js
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Container, Row, Col, Button, FormControl } from 'react-bootstrap';
import './ProblemPage.css'
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import { Spinner } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/api';

const ProblemPage = () => {
    const { id } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const homeworkTitle = location.state.homeworkTitle;

    // State for the user's code input
    const [code, setCode] = useState('');

    // State for the loading indicator
    const [loading, setLoading] = useState(false);

    const [studentScore, setStudentScore] = useState(0);

    // Function to call when the user submits their code
    const submitCode = async () => {
        setLoading(true); // Show the loading indicator
        const result = await api.executeCode(id, homeworkTitle, code);
        console.log(result);  // You can handle the result as you wish.

        setLoading(false); // Hide the loading indicator
        // Navigate to /result with state
        navigate('/result', { state: { homeworkTitle } });
    };

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


    useEffect(() => {
        async function fetchData() {
            console.log(homeworkTitle, id);
            const scoreData = await api.getStudentScoreById(homeworkTitle, id);

            if (scoreData && scoreData.length) {
                let totalScore = scoreData.reduce((a, b) => a + b, 0);
                console.log(totalScore);
                if (totalScore == 99 || totalScore > 100) {
                    totalScore = 100;
                }
                setStudentScore(totalScore);
            }
        }

        fetchData();
    }, [homeworkTitle, id]);

    return (
        <Container className="problem-page-container">
            <Row>
                <NavbarLogo />
            </Row>
            <Row className="navigation-row">
                <Col className="navigation-container">
                    <Navbar />
                </Col>
            </Row>
            <Row className="row-70em">
                <Col>
                    <h1>{homeworkTitle}</h1>
                </Col>
                <Col>
                    <h1>{studentScore}/100</h1>
                </Col>
            </Row>
            <Row className="row-70em">
                <Col className="d-flex justify-content-start">
                    <h2><Button onClick={() => downloadPDF(homeworkTitle)}>PDF Download</Button></h2>
                </Col>
            </Row>
            <Row className="row-70em mt-5">
                <Col className='col-submit'>
                    <h4>SUBMIT:</h4>
                </Col>
            </Row>
            <Row className="row-70em">
                <Col>
                    <FormControl
                        className='formControl-code'
                        as="textarea"
                        placeholder="輸入您的程式碼"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                    />
                </Col>
            </Row>
            <Row className="mt-3  row-70em">
                <Col lg={6} className="d-flex justify-content-end">
                    {loading
                        ? <Spinner animation="border" /> // Show a spinner when loading
                        : <Button className="mt-5 mb-5" onClick={submitCode}>Submit</Button> // Show the submit button when not loading
                    }
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button className="mt-5 mb-5 " onClick={() => navigate(-1)}>Back</Button>
                </Col>
            </Row>
        </Container >
    );
};

export default ProblemPage;
