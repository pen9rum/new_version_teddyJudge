import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import './LeaderBoardContest.css';
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import api from '../../api/api';
import { useLocation } from 'react-router-dom';

const LeaderBoardContest = () => { 
    const location = useLocation();
    const { contestTitle } = location.state;
    console.log(contestTitle);
    
    const [leaderBoardContestData, setLeaderBoardContestData] = useState(null);
    
    useEffect(() => {
        async function fetchLeaderBoardData(){
            try {
                const data  = await api.getLeaderBoardContest(contestTitle);
                if(data) {
                    setLeaderBoardContestData(data);     
                }
            } catch (error) {
                console.error('Failed to fetch leaderboard data:', error);
            }
        }

        fetchLeaderBoardData();
    }, [contestTitle]);

        // Function to create headers for each question dynamically
        const renderQuestionHeaders = () => {
          if (leaderBoardContestData && leaderBoardContestData.leaderBoardContestItems.length > 0) {
              const numberOfQuestions = leaderBoardContestData.leaderBoardContestItems[0].question_scores.length;
              return Array.from({ length: numberOfQuestions }, (_, i) => <th key={`Q_${i + 1}`}>{`Q_${i + 1}`}</th>);
          }
      };

    return (
      <Container className="leaderboardhomework-page-container">
          <Row>
              <NavbarLogo />
          </Row>
          <Row className="navigation-row">
              <Col className="navigation-container">
                  <Navbar />
              </Col>
          </Row>
          <Row className="leaderboard-row">
              <Col>
                  <Table striped bordered hover>
                      <thead>
                          <tr>
                              <th>Rank</th>
                              <th>Student ID</th>
                              <th>Score</th>
                              {renderQuestionHeaders()}
                          </tr>
                      </thead>
                      <tbody>
                          {leaderBoardContestData ? leaderBoardContestData.leaderBoardContestItems.map((item, index) => (
                              <tr key={index}>
                                  <td>{item.rank}</td>
                                  <td>{item.student_id}</td>
                                  <td>{item.score}</td>
                                  {item.question_scores.map((score, idx) => (
                                      <td key={idx}>{score}</td>
                                  ))}
                              </tr>
                          )) : null}
                      </tbody>
                  </Table>
              </Col>
          </Row>
      </Container>
  );
};

export default LeaderBoardContest;