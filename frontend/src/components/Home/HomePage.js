import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import './HomePage.css';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../../images/logo.png';
import schoolLogoImage from '../../images/school_logo.jpg'
import { RoleContext } from '../Auth/RoleContext';

const HomePage = () => {

    const { setRole } = useContext(RoleContext);
    const navigate = useNavigate();

    const handleRoleChange = (newRole) => {
        setRole(newRole);
        navigate('/auth');
    };
    return (
        <Container className="homepage-container">

            <Row>

                <Col className="logo-container_home">
                    <Image src={logoImage} alt="Logo 1" fluid />
                </Col>
                <Col className="x-container">
                    x
                </Col>
                <Col className="logo-container_home">
                    <Image src={schoolLogoImage} alt="Logo 2" fluid />
                </Col>
            </Row>
            <Row>
                <Col className="title-container_home">
                    <h1>TeddyJudge</h1>
                </Col>
            </Row>
            <Row>
                <Col className="button-container">
                    <Button variant="secondary" className="role-button" onClick={() => handleRoleChange('teacher')}>老師</Button>
                    <Button variant="secondary" className="role-button" onClick={() => handleRoleChange('student')}>學生</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
