import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, NavLink } from 'react-bootstrap';
import './AuthPage.css';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../images/logo.png';
import schoolLogoImage from '../../images/school_logo.jpg'
import Image from 'react-bootstrap/Image';
import { AuthContext } from './AuthContext';
import { RoleContext } from './RoleContext';
import api from '../../api/api';

const AuthPage = () => {
    const { role } = useContext(RoleContext);
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const { setIsAuthenticated } = useContext(AuthContext);
    const { setId } = useContext(AuthContext);

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isAuthenticated = false;
        let id, password, confirmPassword;

        if (role === 'student') {
            id = e.target.elements.formBasicId?.value || e.target.elements.formSignUpId?.value;
            password = e.target.elements.formBasicPassword?.value || e.target.elements.formSignUpPassword?.value;
            confirmPassword = e.target.elements.formSignUpConfirmPassword?.value;
            setId(id);
            if (isSignUp) {
                // Student Sign Up
                isAuthenticated = await api.addStudent(id, password, confirmPassword);
                if (isAuthenticated) {
                    // Sign up successful, switch to sign in form
                    setIsSignUp(false);
                    alert('Sign up successful! You can now log in.');
                } else {
                    // Handle failed sign up
                    alert('Failed to sign up');
                }
            } else {
                // Student Sign In
                isAuthenticated = await api.authenticateStudent(id, password);
                if (isAuthenticated) {
                    setIsAuthenticated(true);
                    navigate('/dashboard');
                } else {
                    // Handle failed authentication
                    alert('Failed to authenticate');
                }
            }
        } else if (role === 'teacher') {
            id = e.target.elements.formTeacherId.value;
            password = e.target.elements.formTeacherPassword.value;
            isAuthenticated = await api.authenticateTeacher(id, password);
            setId(id);
            if (isAuthenticated) {
                setIsAuthenticated(true);
                navigate('/tdashboard');
                // navigate('/tdashboard', { state: { id } })
            } else {
                // Handle failed authentication
                alert('Failed to authenticate');
            }
        }
    };


    return (
        <Container className="auth-container">
            <Row>
                <Col className="logo-container_authpage">
                    <Image src={logoImage} alt="Logo 1" fluid />
                </Col>
                <Col className="x-container">
                    x
                </Col>
                <Col className="logo-container_authpage">
                    <Image src={schoolLogoImage} alt="Logo 2" fluid />
                </Col>
            </Row>
            <Row>
                <Col className="title-container_authpage">
                    <h1>TeddyJudge</h1>
                </Col>
            </Row>
            <Form className="rowWidth20em" onSubmit={handleSubmit}>
                {role === 'student' && !isSignUp && (
                    <>
                        <Form.Group className="form-group_authpagh" controlId="formBasicId">
                            <Form.Label>Login</Form.Label>
                            <Form.Control type="id" placeholder="Enter id" />
                        </Form.Group>

                        <Form.Group className="form-group_authpagh" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </>
                )}
                {role === 'student' && isSignUp && (
                    <>
                        <Form.Group className="form-group_authpagh" controlId="formSignUpId">
                            <Form.Label>Id</Form.Label>
                            <Form.Control type="id" placeholder="Enter id" />
                        </Form.Group>

                        <Form.Group className="form-group_authpagh" controlId="formSignUpPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="form-group_authpagh" controlId="formSignUpConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </>
                )}
                {role === 'teacher' && (
                    <>
                        <Form.Group className="form-group_authpagh " controlId="formTeacherId">
                            <Form.Label>Id</Form.Label>
                            <Form.Control type="id" placeholder="Enter id" />
                        </Form.Group>

                        <Form.Group className="form-group_authpagh" controlId="formTeacherPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </>
                )}
                {role === 'student' && (
                    <Row className="auth-switch">
                        <Col>
                            {isSignUp ? (
                                <NavLink onClick={switchAuthModeHandler}>
                                    Already have an account? Log in here
                                </NavLink>
                            ) : (
                                <NavLink onClick={switchAuthModeHandler}>
                                    Don't have an account? Sign up here
                                </NavLink>
                            )}
                        </Col>

                    </Row>
                )}



            </Form>
        </Container>
    );
};

export default AuthPage;
