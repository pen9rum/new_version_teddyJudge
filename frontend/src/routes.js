import React from 'react';
import { Route } from 'react-router-dom';
import AuthPage from './components/Auth/AuthPage';
import HomePage from './components/Home/HomePage';
import Dashboard from './components/Dashboard/Dashboard';
import TDashboard from './components/Dashboard/TDashboard';
import HomeworkPage from './components/Homework/HomeworkPage';
import THomeworkPage from './components/Homework/THomeworkPage';
import THomeworkDetail from './components/Homework/THomeworkDetail';
import THomeworkInput from './components/Homework/THomeworkInput';
import ProblemPage from './components/Problem/ProblemPage';
import ResultPage from './components/Result/ResultPage';

import CoursePage from './components/Course/CoursePage';
import TCoursePage from './components/Course/TCoursePage';
import TCourseInput from './components/Course/TCourseInput';
import TCourseList from './components/Course/TCourseList';
import TCourseModify from './components/Course/TCourseModify';
import TCourseContestList from './components/Course/TCourseContestList';
import TCourseCourseList from './components/Course/TCourseCourseList';

import ContestPage from './components/Contest/ContestPage';
import ContestListPage from './components/Contest/ContestListPage';
import ContestResultPage from './components/Contest/ContestResultPage';
import TContestPage from './components/TContest/TContestPage';
import TContestInput from './components/TContest/TContestInput';


import SettingPage from './components/Setting/SettingPage';
import TSettingPage from './components/Setting/TSettingPage';

import ProtectedRoute from './components/Auth/ProtectedRoute';
import TStyleChecker from './components/TStyleChecker/TStyleChecker';
import TStyleInput from './components/TStyleChecker/TStyleInput';
import StyleCheckResultPage from './components/Result/StyleCheckResultPage';
import LeaderBoardHomework from './components/LeaderBoard/LeaderBoardHomework';

export const routes = (
    <>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route index element={<Dashboard />} />
        </Route>
        <Route path="/tdashboard" element={<ProtectedRoute />}>
            <Route index element={<TDashboard />} />
        </Route>
        <Route path="/homework" element={<ProtectedRoute />}>
            <Route index element={<HomeworkPage />} />
        </Route>
        <Route path="/thomework" element={<ProtectedRoute />}>
            <Route index element={<THomeworkPage />} />
            <Route path="detail" element={<THomeworkDetail />} />
            <Route path="input" element={<THomeworkInput />} />
        </Route>
        <Route path="/problem" element={<ProtectedRoute />}>
            <Route index element={<ProblemPage />} />
        </Route>
        <Route path="/result" element={<ProtectedRoute />}>
            <Route index element={<ResultPage />} />
        </Route>
        <Route path="/style-check-result" element={<ProtectedRoute />}>
            <Route index element={<StyleCheckResultPage />} />
        </Route>
        <Route path="/setting" element={<ProtectedRoute />}>
            <Route index element={<SettingPage />} />
        </Route>
        <Route path="/tsetting" element={<ProtectedRoute />}>
            <Route index element={<TSettingPage />} />
        </Route>
        <Route path="/course" element={<ProtectedRoute />}>
            <Route index element={<CoursePage />} />
        </Route>
        <Route path="/tcourse" element={<ProtectedRoute />}>
            <Route index element={<TCoursePage />} />
            <Route path="input" element={<TCourseInput />} />
            <Route path="list" element={<TCourseList />} />
            <Route path="courselist" element={<TCourseCourseList />} />
            <Route path="modify" element={<TCourseModify />} />
            <Route path="contestlist" element={<TCourseContestList />} />
        </Route>
        <Route path="/contest" element={<ProtectedRoute />}>
            <Route index element={<ContestPage />} />
        </Route>
        <Route path="/tcontest" element={<ProtectedRoute />} >
            <Route index element={<TContestPage />} />
            <Route path="input" element={<TContestInput />} />
        </Route>

        <Route path="/tstyle-checker" element={<ProtectedRoute />}>
            <Route index element={<TStyleChecker />} />
            <Route path="input" element={<TStyleInput />} />
        </Route>

        <Route path="/contestList/:param" element={<ProtectedRoute />}>
            <Route index element={<ContestListPage />} />
        </Route>
        <Route path="/contestResult/:param" element={<ProtectedRoute />}>
            <Route index element={<ContestResultPage />} />
        </Route>

        <Route path="/leaderBoardHomework" element={<ProtectedRoute />}>
            <Route index element={<LeaderBoardHomework />} />
        </Route>

    </>
);
