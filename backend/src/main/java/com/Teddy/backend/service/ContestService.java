package com.Teddy.backend.service;
import com.Teddy.backend.dao.ContestDao;
import com.Teddy.backend.dao.HomeworkDao;
import com.Teddy.backend.dao.TestCaseDao;
import com.Teddy.backend.entity.Contest;
import com.Teddy.backend.entity.Homework;
import com.Teddy.backend.entity.TestCase;
import com.Teddy.backend.model.ContestBO;
import com.Teddy.backend.model.HomeworkBO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Teddy.backend.dao.ContestDao;
import com.Teddy.backend.entity.Contest;
import com.Teddy.backend.model.ContestBO;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
@Service
public class ContestService {

    @Autowired
    private ContestDao contestDao;

    @Autowired
    private TestCaseDao testCaseDao;
    @Autowired
    private HomeworkDao homeworkDao;

    @Transactional
    public boolean add(ContestBO bo) {
        System.out.println("GGG");
        Contest entity = new Contest();
        entity.setContestname(bo.getContestname());
        entity.setTotalscore(bo.getTotalscore());
//        entity.setId(bo.getId());
        entity.setStartTime(bo.getStartTime());
        entity.setEndTime(bo.getEndTime());

        contestDao.save(entity);

        List<Homework> homeworks = new ArrayList<>();
        for (HomeworkBO homeworkBO : bo.getHomeworks()) {

            Homework homework = new Homework();
            homework.setHomeworkName(homeworkBO.getHomeworkName());
            homework.setPDF(homeworkBO.getPDF()); // PDF is now a byte[]
            homework.setStartTime(homeworkBO.getStartTime());
            homework.setEndTime(homeworkBO.getEndTime());
            homework.setAverage(homeworkBO.getAverage());
            homework.setContest(entity);


// 先保存homework
            homeworkDao.save(homework);  // 注意，这里重新接收了保存后的homework，因为save方法会返回持久化后的实例

            List<TestCase> testCases = new ArrayList<>();
            for (int i = 0; i < homeworkBO.getTestCase().size(); i++) {
                String currentTestCase = homeworkBO.getTestCase().get(i);
                String currentTestCaseAnswer = homeworkBO.getTestCaseAnswer().get(i);


                    // if test case does not exist, create a new one
                    TestCase testCase = new TestCase();
                    testCase.setTestCase(currentTestCase);
                    testCase.setTestCaseAnswer(currentTestCaseAnswer);
                    testCase.setHomework(homework);

                    // save the new test case
                    testCaseDao.save(testCase);

                    testCases.add(testCase);

            }

            homework.setTestCases(testCases);

            homeworks.add(homework);

            // save the homework
            homeworkDao.save(homework);
        }

        entity.setHomeworks(homeworks);

        contestDao.save(entity);
        return true;
    }


    public List<ContestBO> getAll() {
        List<Contest> contests = contestDao.findAll();
        List<ContestBO> contestBOs = new ArrayList<>();

        for(Contest contest: contests){
            List<Homework> homeworks = contest.getHomeworks();
            List<HomeworkBO> homeworkBOs = new ArrayList<>();

            for (Homework homework : homeworks) {
                if(homework.getContest()== null){
                    continue;
                }
                HomeworkBO bo = new HomeworkBO();
                // 将所有的 Homework 属性复制到 HomeworkBO
                bo.setHomeworkName(homework.getHomeworkName());

                List<String> testCases = new ArrayList<>();
                List<String> testCaseAnswers = new ArrayList<>();
                for(TestCase testCase : homework.getTestCases()){
                    testCases.add(testCase.getTestCase());
                    testCaseAnswers.add(testCase.getTestCaseAnswer());
                }
                bo.setTestCase(testCases);
                bo.setTestCaseAnswer(testCaseAnswers);

                bo.setStartTime(homework.getStartTime());
                bo.setEndTime(homework.getEndTime());
                bo.setAverage(homework.getAverage());
                // Add the URL for the PDF file
                bo.setPdfUrl("/homework/" + homework.getHomeworkName() + "/pdf");
                homeworkBOs.add(bo);
            }

            ContestBO contestBo = new ContestBO();
            contestBo.setStartTime(contest.getStartTime());
            contestBo.setEndTime(contest.getEndTime());
            contestBo.setId(contest.getId());
            contestBo.setContestname(contest.getContestname());
            contestBo.setTotalscore(contest.getTotalscore());
            contestBo.setHomeworks(homeworkBOs);

            contestBOs.add(contestBo);
        }

        return contestBOs;
    }

    public ContestBO findByContestName(String contestName) {

        Optional<Contest> contestOption = contestDao.findByContestname(contestName);
        Contest contest = contestOption.get();
        if(contest == null){
            return null;
        }

        // convert Contest entity to ContestBO model
        ContestBO contestBo = new ContestBO();
        contestBo.setStartTime(contest.getStartTime());
        contestBo.setEndTime(contest.getEndTime());
        contestBo.setId(contest.getId());
        contestBo.setContestname(contest.getContestname());
        contestBo.setTotalscore(contest.getTotalscore());

        // similar conversion for homeworks
        List<HomeworkBO> homeworkBOs = new ArrayList<>();
        for(Homework homework: contest.getHomeworks()){
            HomeworkBO bo = new HomeworkBO();
            bo.setHomeworkName(homework.getHomeworkName());
            List<String> testCases = new ArrayList<>();
            List<String> testCaseAnswers = new ArrayList<>();
            for(TestCase testCase : homework.getTestCases()){
                testCases.add(testCase.getTestCase());
                testCaseAnswers.add(testCase.getTestCaseAnswer());
            }
            bo.setTestCase(testCases);
            bo.setTestCaseAnswer(testCaseAnswers);
            bo.setStartTime(homework.getStartTime());
            bo.setEndTime(homework.getEndTime());
            bo.setAverage(homework.getAverage());
            bo.setPdfUrl("/homework/" + homework.getHomeworkName() + "/pdf");
            homeworkBOs.add(bo);
        }
        contestBo.setHomeworks(homeworkBOs);

        return contestBo;
    }

    public boolean updateStartTime(Date StartTime, String contestName) {
        Optional<Contest> contest = contestDao.findByContestname(contestName);
        if (contest.isPresent()) {
            contest.get().setStartTime(StartTime);
            contestDao.save(contest.get());
            return true;
        }
        else
        {
            return false;
        }
    }

    public boolean updateEndTime(Date EndTime,String contestName) {
        Optional<Contest> contest = contestDao.findByContestname(contestName);
        if (contest.isPresent()) {
            contest.get().setEndTime(EndTime);
            contestDao.save(contest.get());
            return true;
        }
        else
        {
            return false;
        }
    }

}