import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Authorization': `Basic ${btoa(process.env.REACT_APP_API_USERNAME + ":" + process.env.REACT_APP_API_PASSWORD)}`
    }
});

api.authenticateTeacher = async function (id, password, color = '') {
    try {
        const response = await this.post('/teacher/login', { id, password, color }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.status === 202;
    } catch (error) {
        console.error("Authentication failed:", error);
        return false;
    }
};

api.getHomeworkData = async function () {
    try {
        const response = await this.get('/homework/all', {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Error fetching data: ', response);
            return null;
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
        return null;
    }
};

api.uploadHomework = async function (formData) {
    try {
        const response = await this.post('/homework/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 201) {
            return true;
        } else {
            console.error('Error uploading file: ', response);
            return false;
        }
    } catch (error) {
        console.error('Error uploading file: ', error);
        return false;
    }
};


api.addCourse = async function (courseName, pdfFile) {
    let formData = new FormData();

    formData.append('course', JSON.stringify({ coursename: courseName }));
    formData.append('pdfFile', pdfFile);

    try {
        const response = await this.post('/course/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 201) {
            return true;
        } else {
            console.error('Error submitting course: ', response);
            return false;
        }
    } catch (error) {
        console.error('Error submitting course: ', error);
        return false;
    }
};

api.getAllCourses = async function () {
    try {
        const response = await this.get('/course/all', {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Error fetching data: ', response);
            return null;
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
        return null;
    }
};


api.addContest = async function (contestData, pdfFiles) {
    let formData = new FormData();

    formData.append('contest', JSON.stringify(contestData));
    pdfFiles.forEach(file => formData.append('pdfFiles', file));

    try {
        const response = await this.post('/contest/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 201) {
            return true;
        } else {
            console.error('Error submitting contest: ', response);
            return false;
        }
    } catch (error) {
        console.error('Error submitting contest: ', error);
        return false;
    }
};


api.getContestData = async function () {
    try {
        const response = await this.get('/contest/all', {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Error fetching contest data: ', response);
            return null;
        }
    } catch (error) {
        console.error('Error fetching contest data: ', error);
        return null;
    }
};

api.updateHomeworkStartTime = async function (homeworkName, dateParam) {
    try {
        const response = await this.put(`/homework/${homeworkName}/update/starttime`, null, {
            params: {
                dateParam: dateParam
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.status === 200;
    } catch (error) {
        console.error("Error updating start time:", error);
        return false;
    }
};

api.updateHomeworkEndTime = async function (homeworkName, dateParam) {
    try {
        const response = await this.put(`/homework/${homeworkName}/update/endtime`, null, {
            params: {
                dateParam: dateParam
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.status === 200;
    } catch (error) {
        console.error("Error updating end time:", error);
        return false;
    }
};

api.updateTestCase = async function (homeworkName, testCase, index) {
    try {
        const response = await this.put(`/homework/${homeworkName}/update/testcase/${index}`, testCase, {
            headers: {
                'Content-Type': 'text/plain'
            }
        });

        return response.status === 200;
    } catch (error) {
        console.error("Error updating test case:", error);
        return false;
    }
};

api.updateTestCaseAnswer = async function (homeworkName, testCaseAnswer, index) {
    try {
        const response = await this.put(`/homework/${homeworkName}/update/testcaseanswer/${index}`, testCaseAnswer, {
            headers: {
                'Content-Type': 'text/plain'
            }
        });

        return response.status === 200;
    } catch (error) {
        console.error("Error updating test case answer:", error);
        return false;
    }
};

api.updateHomeworkPDF = async function (homeworkName, pdfFile) {
    let formData = new FormData();

    formData.append('pdfFile', pdfFile);

    try {
        const response = await this.put(`/homework/${homeworkName}/update/pdf`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 200) {
            return true;
        } else {
            console.error('Error updating PDF: ', response);
            return false;
        }
    } catch (error) {
        console.error('Error updating PDF: ', error);
        return false;
    }
};


api.getContestByName = async function (name) {
    try {
        const response = await this.get(`/contest/getByName/${name}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Error fetching data: ', response);
            return null;
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
        return null;
    }
};

api.updateTeacher = async function (id, password, color, name) {
    try {
        const response = await this.put('/teacher/update', { id, password, color, name }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return true;
        } else {
            console.error('Error updating teacher: ', response);
            return false;
        }
    } catch (error) {
        console.error('Error updating teacher: ', error);
        return false;
    }
};



api.getTeacherNameById = async function (id) {
    try {
        const response = await this.get(`/teacher/getNameById/${id}`);

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Error fetching teacher name: ', response);
            return null;
        }
    } catch (error) {
        console.error('Error fetching teacher name: ', error);
        return null;
    }
};

api.authenticateStudent = async function (id, password, authorization, cookie) {
    try {
        const response = await this.post(`/student/login?id=${id}&password=${password}`, null, {

        });

        return response.status === 202;
    } catch (error) {
        console.error("Authentication failed:", error);
        return false;
    }
};


api.addStudent = async function (id, password, confirm_password) {
    let studentBO = {
        id: id,
        password: password,
        confirm_password: confirm_password
    };

    try {
        const response = await this.post('/student/add', studentBO, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.status === 201;
    } catch (error) {
        console.error("Adding student failed:", error);
        return false;
    }
};

api.getStudentNameById = async function (id) {
    try {
        const response = await this.get(`/student/getNameById/${id}`);

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Error fetching student name: ', response);
            return null;
        }
    } catch (error) {
        console.error('Error fetching student name: ', error);
        return null;
    }
};

api.updateStudent = async function (id, password, color, name) {
    try {
        const response = await this.put('/student/update', { id, password, color, name }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return true;
        } else {
            console.error('Error updating student: ', response);
            return false;
        }
    } catch (error) {
        console.error('Error updating student: ', error);
        return false;
    }
};

api.getStudentScoreById = async function (homeworkName, id) {
    console.log(homeworkName, id);
    try {
        const response = await this.post('/student_homework/get_score_by_Id', {
            homeworkName: homeworkName,
            id: id,
            scores: []
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Error fetching student score: ', response);
            return null;
        }
    } catch (error) {
        console.error('Error fetching student score: ', error);
        return null;
    }
};

api.getStudentResultById = async function (homeworkName, id) {
    console.log(homeworkName, id);
    try {
        const response = await this.post('/student_homework/get_result_by_Id', {
            homeworkName: homeworkName,
            id: id,
            scores: []
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });


        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Error fetching student score: ', response);
            return null;
        }
    } catch (error) {
        console.error('Error fetching student score: ', error);
        return null;
    }
};

api.getStudentStyleCheckResultById = async function (homeworkName, id) {
    console.log(homeworkName, id);
    try {
        const response = await this.post('/style-check/result', {
            homeworkName: homeworkName,
            studentId: id,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });


        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Error fetching style check: ', response);
            return null;
        }
    } catch (error) {
        console.error('Error fetching style check: ', error);
        return null;
    }
};


api.getStudentSourceCodeById = async function (homeworkName, id) {
    console.log(homeworkName, id);
    try {
        const response = await this.post('/student_homework/sourceCode', {
            homeworkName: homeworkName,
            id: id,
            scores: []
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Error fetching student score: ', response);
            return null;
        }
    } catch (error) {
        console.error('Error fetching student score: ', error);
        return null;
    }
};


api.executeCode = async function (id, homeworkName, sourceCode) {
    try {
        const response = await this.post('/code/execute', {
            id,
            homeworkName,
            sourceCode
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Error executing code: ', response);
            return null;
        }
    } catch (error) {
        console.error('Error executing code: ', error);
        return null;
    }
};

api.getAverageScoreByHomeworkName = async function (homeworkName) {
    try {
        const response = await this.post('/student_homework/average', {
            homeworkName: homeworkName,
            id: "",
            scores: []
        }, {
            headers: {
                'Content-Type': 'application/json',
            },

        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Error fetching average score: ', response);
            return null;
        }
    } catch (error) {
        console.error('Error fetching average score: ', error);
        return null;
    }
};

api.getHomeworkByHomeworkName = async function (homeworkName) {
    try {
        const response = await this.get(`/homework/${homeworkName}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa(process.env.REACT_APP_API_USERNAME + ":" + process.env.REACT_APP_API_PASSWORD)}`
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Error fetching homework by name: ', response);
            return null;
        }
    } catch (error) {
        console.error('Error fetching homework by name: ', error);
        return null;
    }
};

api.addStyleCheck = async function (homeworkName, styleCheckData) {
    try {
        const response = await this.post('/style-check/add', {
            homeworkName: homeworkName,
            functionName: styleCheckData.functionName,
            functionType: styleCheckData.functionType
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            return true;
        } else {
            console.error('Error submitting style check: ', response);
            return false;
        }
    } catch (error) {
        console.error('Error submitting style check: ', error);
        return false;
    }
};

api.updateContestEndTime = async function (contestName, dateParam) {
    try {
        const response = await this.put(`/contest/${contestName}/update/endtime`, null, {
            params: {
                dateParam: dateParam
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.status === 200;
    } catch (error) {
        console.error("Error updating end time:", error);
        return false;
    }
};

api.updateContestStartTime = async function (contestName, dateParam) {
    try {
        const response = await this.put(`/contest/${contestName}/update/starttime`, null, {
            params: {
                dateParam: dateParam
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.status === 200;
    } catch (error) {
        console.error("Error updating end time:", error);
        return false;
    }
};

api.getLeaderBoardHomework = async function (homeworkName) {
    try {        
      const response = await this.get(`/leaderboardhomework/getRank/${homeworkName}`);
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error fetching leader board homework: ', response);
        return null;
      }
    } catch (error) {
      console.error('Error fetching leader board homework: ', error);
      return null;
    }
  };

api.getCalendar = async function(){
    try {        
        const response = await this.get(`/calendar/getCalendar`);
        if (response.status === 200) {
          return response.data;
        } else {
          console.error('Error fetching leader board homework: ', response);
          return null;
        }
      } catch (error) {
        console.error('Error fetching leader board homework: ', error);
        return null;
      }
}

export default api;
