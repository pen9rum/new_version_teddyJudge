import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import './TDashboard.css';
import api from '../../api/api';
import MyCalendar from '../Calendar/MyCalendar';


const TDashboard = () => {
    const navigate = useNavigate();
    const { id } = useContext(AuthContext);
    const [teacherName, setTeacherName] = useState('');



    useEffect(() => {
        const fetchTeacherName = async () => {
            const name = await api.getTeacherNameById(id);
            setTeacherName(name);
            console.log(name);
            console.log(id);

        };
        fetchTeacherName();
    }, [id]);

    return (
        <Container className="tdashboard-container">
            <Row>
                <NavbarLogo />
            </Row>
            <Row className="navigation-row">
                <Col className="navigation-container">
                    <Navbar />
                </Col>
            </Row>
            <Row>
                <Col className="welcome-container">
                    <h2>Hi, {teacherName}老師 您回來了</h2>
                </Col>
            </Row>
            <Row>

                <Col className="section-container">
                    <h2>想做甚麼呢?</h2>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button onClick={() => navigate("/thomework")}>HW</Button>
                </Col>
                <Col>
                    <Button onClick={() => navigate("/tcontest")}>Contest</Button>
                </Col>
                <Col>
                    <Button onClick={() => navigate("/tcourse")}>Course</Button>
                </Col>
            </Row>
            
            <MyCalendar/>

        </Container>
    );
};

export default TDashboard;
