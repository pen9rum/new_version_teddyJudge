import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AuthContext } from '../Auth/AuthContext';
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import styles from './ContestListPage.module.css';
import ContestListContainer from './ContestListContainer';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/api';

const ContestListPage = () => {
    const { id } = useContext(AuthContext);

    const { param } = useParams();
    var isGoOrReview = param;
    const location = useLocation();
    const contestTitle = location.state?.contestTitle;
    console.log(contestTitle);

    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [contestScore, setContestScore] = useState(0);
    const [contestMaxScore, setContestMaxScore] = useState(0);

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchData = async () => {
            let contestScore = 0;
            let contestData = await api.getContestByName(contestTitle);
            if (contestData && contestData.homeworks) {
                const homeworksWithScores = await Promise.all(
                    contestData.homeworks.map(async (homework) => {
                        let scores = await api.getStudentScoreById(homework.homeworkName, id);
                        homework.totalScore = scores.reduce((a, b) => a + b, 0);
                        if (homework.totalScore === 99 || homework.totalScore > 100) {
                            homework.totalScore = 100;
                        }
                        contestScore += homework.totalScore;
                        console.log(homework.totalScore);
                        return homework;
                    })
                );
                contestData = { ...contestData, homeworks: homeworksWithScores };
            }
            setContestScore(contestScore);
            setContestMaxScore(contestData.homeworks.length * 100);
            setData(contestData);
            console.log(contestData);
        };

        fetchData();
    }, [contestTitle]);

    return (
        <Container className={`${styles.contestListPage}`}>
            <Row >
                <NavbarLogo />
            </Row>
            <Row className={`${styles.navigationRow} `} >
                <Col className={styles.navigationContainer}>
                    <Navbar />
                </Col>
            </Row>
            <Row className={`${styles.rowWidth70em} mt-2 mb-3`}>
                <Col lg={4} className="text-center">
                    <h2>{contestTitle}</h2>
                </Col>
                <Col>
                    <h2>
                        <span
                            className={
                                contestScore === contestMaxScore ? `${styles.textBlack}` : `${styles.textRed}`
                            }
                        >
                            {contestScore}
                        </span>/{contestMaxScore}
                    </h2>
                </Col>
            </Row>

            {
                data && data.homeworks ? (
                    <Row className={`${styles.rowWidth70em}`}>
                        <Col className={`mb-5`}>
                            {data.homeworks.map((homework, index) => (
                                isGoOrReview === 'Go' ?
                                    <ContestListContainer
                                        key={index}
                                        homeworkTitle={homework.homeworkName} // pass a specific property of the homework object
                                        score={homework.totalScore} // update these as necessary with your real data
                                        scoreTotal={100} // update these as necessary with your real data
                                        isAnsOrNot={true} // update these as necessary with your real data
                                    /> :
                                    <ContestListContainer
                                        key={index}
                                        homeworkTitle={homework.homeworkName} // pass a specific property of the homework object
                                        score={homework.totalScore} // update these as necessary with your real data
                                        scoreTotal={100} // update these as necessary with your real data
                                        isAnsOrNot={false} // update these as necessary with your real data
                                    />
                            ))}
                        </Col>
                    </Row>
                ) : null
            }


            <Row className={`${styles.rowWidth70em}`}>
                <Col lg={9} className="text-end mt-3">
                    <Button variant="primary" onClick={handleBack}>
                        Return
                    </Button>
                </Col>
            </Row>


        </Container >
    );
};

export default ContestListPage;
