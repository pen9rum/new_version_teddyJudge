import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../Auth/AuthContext';
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import styles from './ContestPage.module.css';
import ContestContainer from './ContestContainer';
import api from '../../api/api';

const ContestPage = () => {
    const { id } = useContext(AuthContext);
    const [contests, setContests] = useState([]);

    const formatDateTime = (date) => {
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // add 1 because months are 0-indexed
        const day = date.getUTCDate().toString().padStart(2, '0');
        const hour = date.getUTCHours().toString().padStart(2, '0');
        const minute = date.getUTCMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}`;
    };

    useEffect(() => {
        const fetchContests = async () => {
            const contestData = await api.getContestData(); // this should now include scores
            const contestsWithScores = await Promise.all(
                contestData.map(async (contest) => {
                    // get the scores for each contest
                    let contestScore = 0;
                    let contestTotalScore = 0;
                    if (contest.homeworks) {
                        const homeworksWithScores = await Promise.all(
                            contest.homeworks.map(async (homework) => {
                                const scores = await api.getStudentScoreById(homework.homeworkName, id);
                                let totalHomeworkScore = scores.reduce((a, b) => a + b, 0);
                                if (totalHomeworkScore == 99 || totalHomeworkScore > 100) {
                                    totalHomeworkScore = 100;
                                }
                                console.log(totalHomeworkScore);
                                contestScore += totalHomeworkScore;
                                contestTotalScore = (contest.homeworks.length * 100); // calculate ContestTotalScore
                                console.log("題數" + contest.homeworks.length)
                                return {
                                    ...homework,
                                    totalscore: totalHomeworkScore,
                                };
                            })
                        );
                        return {
                            ...contest,
                            homeworks: homeworksWithScores,
                            totalscore: contestScore,
                            totalScoreMax: contestTotalScore
                        };
                    }
                    return contest;
                })
            );
            setContests(contestsWithScores);
        };

        fetchContests();
    }, []);




    // Separate contests into upcoming and past based on the current date
    const currentDate = new Date().toISOString(); // current date in same format as your API
    const upcomingContests = contests.filter(contest => contest.startTime > currentDate);
    const curContests = contests.filter(contest => (contest.startTime < currentDate) && (contest.endTime > currentDate));
    const pastContests = contests.filter(contest => contest.endTime < currentDate);
    console.log(upcomingContests);
    console.log(pastContests);

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
            <Row className={`${styles.rowWidth70em} mt-5`}>
                <Col lg={4} className={`${styles.sectionContainer} `}>
                    <h2>未來的Contest</h2>
                    <div className={`${styles.sectionContent}`}>
                        {upcomingContests.map(contest => {
                            // create Date objects from the contest's startTime and endTime
                            const startDate = new Date(contest.startTime);
                            const endDate = new Date(contest.endTime);

                            // format these Date objects into strings using your formatDateTime() function
                            const formattedStartTime = formatDateTime(startDate);
                            const formattedEndTime = formatDateTime(endDate);

                            // create a string representation of the contest's duration
                            const contestDuration = `${formattedStartTime} - ${formattedEndTime}`;

                            return (
                                <Row className={`${styles.rowWidth70em} `}>
                                    <Col>
                                        <ContestContainer
                                            contestTitle={contest.contestname}
                                            status={false}
                                            dueDate={contestDuration} // pass the contestDuration string here

                                        />
                                    </Col>
                                </Row>
                            );
                        })}
                    </div>
                </Col>
            </Row>


            <Row className={`${styles.rowWidth70em} mt-5`}>
                <Col lg={4} className={`${styles.sectionContainer} `}>
                    <h2>進行中Contest</h2>
                    <div className={`${styles.sectionContent}`}>
                        {curContests.map(contest => {
                            // create Date objects from the contest's startTime and endTime
                            const startDate = new Date(contest.startTime);
                            const endDate = new Date(contest.endTime);

                            // format these Date objects into strings using your formatDateTime() function
                            const formattedStartTime = formatDateTime(startDate);
                            const formattedEndTime = formatDateTime(endDate);

                            // create a string representation of the contest's duration
                            const contestDuration = `${formattedStartTime} - ${formattedEndTime}`;

                            return (
                                <Row className={`${styles.rowWidth70em} `}>
                                    <Col>
                                        <ContestContainer
                                            contestTitle={contest.contestname}
                                            status={false}
                                            dueDate={contestDuration} // pass the contestDuration string here
                                            btnStatus={"go"}
                                        />
                                    </Col>
                                </Row>
                            );
                        })}
                    </div>
                </Col>
            </Row>




            <Row className={`${styles.rowWidth70em} mt-5`}>
                <Col lg={4} className={`${styles.sectionContainer} `}>
                    <h2>先前的Contest</h2>
                    <div className={`${styles.sectionContent}`}>
                        {pastContests.map(contest => (
                            <Row className={`${styles.rowWidth70em}`}>

                                <Col>
                                    <ContestContainer
                                        contestTitle={contest.contestname}
                                        status={true}
                                        score={contest.totalscore} // 這裡要變成 contestScore
                                        contestTotalScore={contest.totalScoreMax}
                                        btnStatus={'review'}
                                    />
                                </Col>
                            </Row>
                        ))}
                    </div>
                </Col>
            </Row>




        </Container>
    );
};

export default ContestPage;
