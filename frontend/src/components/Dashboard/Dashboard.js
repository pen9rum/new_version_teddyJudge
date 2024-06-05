import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import NavbarLogo from '../Navbar/NavbarLogo';
import HomeworkContainer from '../Homework/HomeworkContainer';
import MyCalendar from '../Calendar/MyCalendar';
import './Dashboard.css';
import api from '../../api/api';

const Dashboard = () => {
    const { id } = useContext(AuthContext);
    const [studentName, setStudentName] = useState('');
    const [currentHomeworks, setCurrentHomeworks] = useState([]);

    const formatDateTime = (date) => {
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // add 1 because months are 0-indexed
        const day = date.getUTCDate().toString().padStart(2, '0');
        const hour = date.getUTCHours().toString().padStart(2, '0');
        const minute = date.getUTCMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}`;
    };

    const fetchHomework = async () => {
        const allHomeworks = await api.getHomeworkData();
        const now = new Date();
        const ongoingHomeworks = [];

        for (let homework of allHomeworks) {
            const startTime = new Date(homework.startTime);
            const endTime = new Date(homework.endTime);

            const result = await api.getStudentResultById(homework.homeworkName, id);

            if (result === "") {
                if (startTime <= now && now <= endTime) {
                    ongoingHomeworks.push(homework);
                }
            }
        }

        setCurrentHomeworks(ongoingHomeworks);
    };

    useEffect(() => {
        const fetchStudentName = async () => {
            const name = await api.getStudentNameById(id);
            setStudentName(name);
        };

        fetchStudentName();
        fetchHomework();
    }, [id]);

    return (
        <Container className="dashboard-container">
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
                    <h2>Hi, {studentName} 你回來了</h2>
                </Col>
            </Row>
            <Row>
                <Col className="section-container">
                    <h2>你還沒完成的作業</h2>
                    <div className="section-content">
                        {currentHomeworks.map((homework) => {
                            const formattedEndTime = formatDateTime(new Date(homework.endTime));
                            return (
                                <div className="mt-3 mb-3" key={homework.homeworkName}>
                                    <HomeworkContainer
                                        homeworkTitle={homework.homeworkName}
                                        dueDate={formattedEndTime}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </Col>
            </Row>

            <MyCalendar/>
        </Container>
    );
};

export default Dashboard;
