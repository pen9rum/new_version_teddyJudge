package com.Teddy.backend.service;
import com.Teddy.backend.dao.StudentDao;
import com.Teddy.backend.dao.TestCaseDao;
import com.Teddy.backend.entity.Student;
import com.Teddy.backend.entity.TestCase;
import com.Teddy.backend.model.StudentBO;
import com.Teddy.backend.model.ValidContributor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Teddy.backend.dao.HomeworkDao;
import com.Teddy.backend.entity.Homework;
import com.Teddy.backend.model.HomeworkBO;

import java.util.Date;
import java.util.Optional;
import java.util.List;
import java.util.ArrayList;

@Service
public class HomeworkService {
    @Autowired
    private HomeworkDao homeworkDao;

    @Autowired
    private TestCaseDao testCaseDao;

    public boolean add(HomeworkBO bo) {

        // Check if the homework already exists in the database
        if (homeworkDao.existsByHomeworkName(bo.getHomeworkName())) {
            // Homework already exists, return false or throw an exception
            return false;
        }

        Homework entity = new Homework();
        entity.setHomeworkName(bo.getHomeworkName());
        entity.setPDF(bo.getPDF()); // PDF is now a byte[]
        entity.setStartTime(bo.getStartTime());
        entity.setEndTime(bo.getEndTime());
        entity.setAverage(bo.getAverage());
        entity.setContest(null);
        entity.setHomework(!bo.isContestOrNot());

        if (!testCaseDao.existsByHomework(entity)) {
            List<TestCase> testCases = new ArrayList<>();
            for (int i = 0; i < bo.getTestCase().size(); i++) {
                if(bo.getTestCase().get(i)!="" && bo.getTestCaseAnswer().get(i)!="") {
                    TestCase testCase = new TestCase();
                    testCase.setTestCase(bo.getTestCase().get(i));
                    testCase.setTestCaseAnswer(bo.getTestCaseAnswer().get(i));
                    testCase.setHomework(entity);
                    testCase.setTestCaseIndex(i);
                    testCases.add(testCase);
                }
            }
            entity.setTestCases(testCases);
        }
        homeworkDao.save(entity);


        return true;
    }


    public List<HomeworkBO> getAll() {
        List<Homework> homeworks = homeworkDao.findAll();
        List<HomeworkBO> homeworkBOs = new ArrayList<>();

        for (Homework homework : homeworks) {
            if(homework.getContest()!= null){
                continue;
            }
            HomeworkBO bo = new HomeworkBO();
            // 将所有的 Homework 属性复制到 HomeworkBO
            bo.setHomeworkName(homework.getHomeworkName());

            // Get test cases from homework entity
            List<TestCase> testCases = homework.getTestCases();

            // Transform the test cases and their answers to lists
            List<String> testCaseList = new ArrayList<>();
            List<String> testCaseAnswerList = new ArrayList<>();
            for (TestCase testCase : testCases) {
                testCaseList.add(testCase.getTestCase());
                testCaseAnswerList.add(testCase.getTestCaseAnswer());
            }
            bo.setTestCase(testCaseList);
            bo.setTestCaseAnswer(testCaseAnswerList);

            bo.setStartTime(homework.getStartTime());
            bo.setEndTime(homework.getEndTime());
            bo.setAverage(homework.getAverage());

            // Add the URL for the PDF file
            bo.setPdfUrl("/homework/" + homework.getHomeworkName() + "/pdf");
            homeworkBOs.add(bo);
        }
        return homeworkBOs;
    }



    public boolean updateStartTime(Date StartTime,String homeworkName) {
        Optional<Homework> homework = homeworkDao.findByHomeworkName(homeworkName);
        if (homework.isPresent()) {
             homework.get().setStartTime(StartTime);
             homeworkDao.save(homework.get());
            return true;
        }
        else
        {
            return false;
        }
    }

    public boolean updateEndTime(Date EndTime,String homeworkName) {
        Optional<Homework> homework = homeworkDao.findByHomeworkName(homeworkName);
        if (homework.isPresent()) {
            homework.get().setEndTime(EndTime);
            homeworkDao.save(homework.get());
            return true;
        }
        else
        {
            return false;
        }
    }
    public boolean updateAverage(float average,String homeworkName) {
        Optional<Homework> homework = homeworkDao.findByHomeworkName(homeworkName);
        if (homework.isPresent()) {
            homework.get().setAverage(average);
            homeworkDao.save(homework.get());
            return true;
        }
        else
        {
            return false;
        }
    }

    public boolean updateHomeworkName(String HomeworkName,String homeworkName) {
        Optional<Homework> homework = homeworkDao.findByHomeworkName(homeworkName);
        if (homework.isPresent()) {
            homework.get().setHomeworkName(HomeworkName);
            homeworkDao.save(homework.get());
            return true;
        }
        else
        {
            return false;
        }
    }

    public boolean updateTestCase(String homeworkName, int testCaseIndex, String testcase) {
        Optional<TestCase> testCaseOption = testCaseDao.findByHomeworkHomeworkNameAndTestCaseIndex(homeworkName, testCaseIndex);
        if (testCaseOption.isPresent()) {
            var testCase = testCaseOption.get();
            testCase.setTestCase(testcase);
            testCaseDao.save(testCase);
            return true;
        } else {
            return false;
        }
    }


    public boolean updateTestCaseAnswer(String homeworkName, int testCaseIndex, String testCaseAnswer) {
        Optional<TestCase> testCaseOption = testCaseDao.findByHomeworkHomeworkNameAndTestCaseIndex(homeworkName, testCaseIndex);
        if (testCaseOption.isPresent()) {
            var testCase = testCaseOption.get();
            testCase.setTestCaseAnswer(testCaseAnswer);
            testCaseDao.save(testCase);
            return true;
        } else {
            return false;
        }
    }

    public byte[] getPdf(String homeworkName) {
        Optional<Homework> homework = homeworkDao.findByHomeworkName(homeworkName);
        if (homework.isPresent()) {
            return homework.get().getPDF();
        } else {
            return null;
        }
    }


    public boolean deletePdf(String homeworkName) {
        Optional<Homework> homework = homeworkDao.findByHomeworkName(homeworkName);
        if (homework.isPresent()) {
            Homework homeworkEntity = homework.get();
            byte[] pdfData = homeworkEntity.getPDF();
            homeworkEntity.setPDF(null);
            homeworkDao.save(homeworkEntity);
            return true;
        }
        else
        return false;
    }

    public boolean updatePdf(String homeworkName, byte[] newPdfData) {
        Optional<Homework> homework = homeworkDao.findByHomeworkName(homeworkName);
        if (homework.isPresent()) {
            Homework homeworkEntity = homework.get();
            homeworkEntity.setPDF(newPdfData);
            homeworkDao.save(homeworkEntity);
            return true;
        } else {
            return false;
        }
    }

    public HomeworkBO getHomeworkByHomeworkName(String homeworkName){
        var homeworkOptional =  homeworkDao.findByHomeworkName(homeworkName);
        if(!homeworkOptional.isPresent()){return null;}
        var homework = homeworkOptional.get();

        HomeworkBO bo = new HomeworkBO();
        bo.setHomeworkName(homework.getHomeworkName());

        // Get test cases from homework entity
        List<TestCase> testCases = homework.getTestCases();

        // Transform the test cases and their answers to lists
        List<String> testCaseList = new ArrayList<>();
        List<String> testCaseAnswerList = new ArrayList<>();
        for (TestCase testCase : testCases) {
            testCaseList.add(testCase.getTestCase());
            testCaseAnswerList.add(testCase.getTestCaseAnswer());
        }
        bo.setTestCase(testCaseList);
        bo.setTestCaseAnswer(testCaseAnswerList);

        bo.setStartTime(homework.getStartTime());
        bo.setEndTime(homework.getEndTime());
        bo.setAverage(homework.getAverage());
        if(homework.getContest()==null){
            bo.setContestOrNot(false);
        }else{
            bo.setContestOrNot(true);
        }


        // Add the URL for the PDF file
        bo.setPdfUrl("/homework/" + homework.getHomeworkName() + "/pdf");

        return bo;
    }



}
