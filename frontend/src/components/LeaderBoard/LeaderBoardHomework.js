import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import './LeaderBoardHomework.css';
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import api from '../../api/api';
import { useLocation } from 'react-router-dom';

const LeaderBoardHomework = () => { 
    const location = useLocation();
    const { homeworkTitle } = location.state;
    console.log(homeworkTitle);
    
    const [leaderBoardHomeworkData, setLeaderBoardHomeworkData] = useState(null);
    
    useEffect(() =>{
            async function fetchLeaderBoardData(){
                const data = await api.getLeaderBoardHomework(homeworkTitle);
                if(data){
                    setLeaderBoardHomeworkData(data);     
                }
            };

            fetchLeaderBoardData();
        }, [homeworkTitle]);


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
          </tr>
        </thead>
        <tbody>
          {leaderBoardHomeworkData ?  leaderBoardHomeworkData.rankItems.map((item, index) => (
            <tr key={item.id}>
              <td>{item.rank}</td>
              <td>{item.sid}</td>
              <td>{item.score}</td>
            </tr>
          )) : null
        }
        </tbody>
      </Table>
    </Col>
  </Row>

        </Container>
    );
};

export default LeaderBoardHomework;
