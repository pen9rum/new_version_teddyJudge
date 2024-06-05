import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './DownloadFileContainer.module.css';
import api from '../../api/api';


const DownloadFileContainer = ({ fileTitle, fileSize }) => {

    async function downloadPDF(fileTitle) {
        try {
            const fileName = fileTitle.replace('.pdf', '');
            const response = await api.get(`/course/${fileName}/pdf`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${fileName}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Download failed:", error);
        }
    }

    return (
        <Container className={styles.downloadFileContainer}>
            <Row>
                <Col lg={10}>
                    <Row className="mt-3">
                        <Col className={`text-start`}>
                            <header>
                                <h4 className="mx-3">{fileTitle}</h4>
                            </header>
                        </Col>
                    </Row>
                    <Row >
                        <Col className={`text-end`}>
                            <h4 className="mx-3">{fileSize}</h4>
                        </Col>
                    </Row>
                </Col>

                <Col className={`text-center ${styles.colBtnGo} d-flex justify-content-end p-0`}>
                    <Button className={`btn-go ${styles.btnGo}`} variant="primary" onClick={() => downloadPDF(fileTitle)}>
                        Download
                    </Button>

                </Col>
            </Row >
        </Container >
    );
};




export default DownloadFileContainer;
