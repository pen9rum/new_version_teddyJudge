import React, { useState, useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import styles from './TSettingPage.module.css';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';


const TSettingPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [color, setColor] = useState('White');
    const [newPassword, setNewPassword] = useState('');
    const { id } = useContext(AuthContext);

    const handleSubmit = async () => {
        const success = await api.updateTeacher(id, newPassword, color, name);
        if (success) {
            window.alert('Teacher update successful!');
            navigate(-1);
        } else {
            console.error('Failed to update teacher');
        }
    };


    return (
        <Container className={styles.settingPageContainer}>
            <Row>
                <NavbarLogo />
            </Row>
            <Row className={styles.navigationRow}>
                <Col className={styles.navigationContainer}>
                    <Navbar />
                </Col>
            </Row>

            <Row className={styles.rowWidth40em}>
                <Col className="text-start">
                    <h3>名字 : </h3>
                </Col>
                <Col>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                </Col>
            </Row>
            {/* <Row className={styles.rowWidth40em}>
                <Col className="text-start">
                    <h3>背景顏色 : </h3>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Form.Group controlId="exampleComboBox">
                        <Form.Select value={color} onChange={(e) => setColor(e.target.value)} className={styles.selectCustomer}>
                            <option value="White">White</option>
                            <option value="Dark">Dark</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row> */}


            <Row className={styles.rowWidth40em}>
                <Col className="text-start">
                    <h3>更改密碼 : </h3>
                </Col>
                <Col>
                    <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </Col>
            </Row>

            <Row className={styles.rowWidth40em}>
                <Col className="d-flex justify-content-end">
                    <Button onClick={handleSubmit}>
                        SAVE+RETURN
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default TSettingPage;
