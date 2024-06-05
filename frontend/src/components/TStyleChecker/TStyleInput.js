import React from 'react';
import Navbar from '../Navbar/Navbar';
import styles from './TStyleInput.module.css'
import NavbarLogo from '../Navbar/NavbarLogo';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/api';



const TStyleInput = () => {
    const [functions, setFunctions] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const homeworkName = location.state?.homeworkName;
    const numberCheckings = parseInt(location.state?.numberCheckings, 10);
    console.log(numberCheckings);

    const handleInputChange = (index, field) => event => {
        const newFunctions = [...functions];
        if (!newFunctions[index]) {
            newFunctions[index] = {};
        }
        newFunctions[index][field] = event.target.value;
        setFunctions(newFunctions);
    };


    const handleClick = () => {
        const functionName = functions.map(func => func.name);
        const functionType = functions.map(func => func.type);
        const styleCheckData = {
            homeworkName: homeworkName,
            functionName: functionName,
            functionType: functionType
        };
        api.addStyleCheck(styleCheckData.homeworkName, styleCheckData).then(result => {
            if (result) {
                alert("Submit style check successfully");
                navigate("/tstyle-checker");
            } else {
                alert("Sumbit style check failed");
            }
        });
    };


    return (
        <>
            <Container className={styles.styleCheckerPageContainer}>
                <Row>
                    <NavbarLogo />
                </Row>
                <Row className={styles.navigationRow}>
                    <Col className={styles.navigationContainer}>
                        <Navbar />
                    </Col>
                </Row>
                {Array(numberCheckings).fill(null).map((_, index) => (
                    <React.Fragment key={index}>
                        <div className={styles.inputBox}>
                            <Row className={`${styles.rowWidth70em}  `}>
                                <Col lg={3} className={styles.mt7}>
                                    <h2> 函式名稱{index + 1} :</h2>
                                </Col>

                                <Col lg={3} className={`${styles.mt7} ${styles.width800}`}>
                                    <Form.Control type="text" onChange={handleInputChange(index, 'name')} />
                                </Col>
                            </Row>

                            <Row className={`${styles.rowWidth70em} `}>
                                <Col lg={3}>
                                    <h2> 型態 :</h2>
                                </Col>
                                <Col lg={3} className={`${styles.width800}`}>
                                    <Form.Control type="text"
                                        onChange={handleInputChange(index, 'type')} />
                                </Col>
                            </Row>



                        </div>
                    </React.Fragment>
                ))}




                <Row className={`${styles.rowWidth70em} justify-content-end `}>
                    <Col lg={3} >
                        <Button onClick={handleClick} >Submit</Button>
                    </Col>
                </Row>

            </Container >

        </>
    );
};

export default TStyleInput;
