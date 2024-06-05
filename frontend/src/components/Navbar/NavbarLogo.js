import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import logoImage from '../../images/logo.png';
import './NavbarLogo.css';

const NavbarLogo = () => {
    return (
        <Row>
            <Col className="logo-container_dashboard">
                <h1>TeddyJudge</h1>
            </Col>
            <Col className="logo-container_dashboard">
                <Image src={logoImage} alt="Logo 1" fluid />
            </Col>
        </Row>
    );
};

export default NavbarLogo;
