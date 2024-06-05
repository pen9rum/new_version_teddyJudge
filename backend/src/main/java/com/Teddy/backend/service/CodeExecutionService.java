package com.Teddy.backend.service;

import com.Teddy.backend.dao.*;
import com.Teddy.backend.entity.Student;
import com.Teddy.backend.entity.StudentHomeworkBox;
import com.Teddy.backend.entity.StyleCheck;
import com.Teddy.backend.entity.StyleCheckResult;
import com.Teddy.backend.model.JavaCodeExecutor;
import com.Teddy.backend.model.StyleCheckExecutor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Teddy.backend.model.ExecuteCodeRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CodeExecutionService {
    @Autowired
    private JavaCodeExecutor javaCodeExecutor;

    @Autowired
    private HomeworkDao homeworkDao;

    @Autowired
    private StudentHomeworkBoxDao studentHomeworkBoxDao;

    @Autowired
    private StyleCheckExecutor styleCheckExecutor;

    @Autowired
    private StyleCheckDao styleCheckDao;

    @Autowired
    private StyleCheckResultDao styleCheckResultDao;

    @Autowired
    private StudentDao studentDao;

    @Autowired
    private LeaderBoardHomeworkService leaderBoardHomeworkService;

    public String compileAndRunJavaCode(ExecuteCodeRequest request) {

        var homeWorkOptional = homeworkDao.findByHomeworkName(request.getHomeworkName());
        var homework = homeWorkOptional.get();
        var testCases = homework.getTestCases();
        List<Double> results = new ArrayList<>();

        var compilerOut = javaCodeExecutor.compileAndRunJavaCode(request.getSourceCode(), request.getId(), testCases, results);

        while(results.size() < testCases.size()){
            results.add(0.0);
        }

        // Update Student homework box
        StudentHomeworkBox studentHomeworkBox = new StudentHomeworkBox();
        studentHomeworkBox.setId(request.getId());
        studentHomeworkBox.setHomeworkName(request.getHomeworkName());
        studentHomeworkBox.setScores(results);
        studentHomeworkBox.setResult(compilerOut);
        studentHomeworkBox.setSourceCode(request.getSourceCode());
        studentHomeworkBoxDao.save(studentHomeworkBox);

        // Update Student leaderboard for homework
        leaderBoardHomeworkService.update(request.getHomeworkName());




        System.out.println(request.getHomeworkName());
        // Get all style checks for the given homework
        List<StyleCheck> styleChecks = styleCheckDao.findByHomework(homework);

        System.out.println(styleChecks.size());

        // Prepare the parameters for checkStyle()
        List<String> functionNames = new ArrayList<>();
        List<String> functionTypes = new ArrayList<>();


        for (StyleCheck styleCheck : styleChecks) {
            functionNames.add(styleCheck.getFunctionName());
            functionTypes.add(styleCheck.getFunctionType());
           }

        System.out.println(functionNames);
        System.out.println(functionTypes);
        // Check style
        List<String> styleCheckResults = styleCheckExecutor.checkStyle(request.getSourceCode(), functionNames, functionTypes);
        System.out.println(styleCheckResults);

      Student student =  studentDao.findById(request.getId()).get();
      Long id = 1L;
      // Save style check results
        // Save style check results
        for (String styleCheckResult : styleCheckResults) {
            // First, try to find existing style check result in the database
            Optional<StyleCheckResult> existingResultOptional = styleCheckResultDao.findByHomeworkAndStudentAndId(homework, student, id);

            StyleCheckResult result;

            // If the result exists, update it
            if (existingResultOptional.isPresent()) {
                result = existingResultOptional.get();
            } else {
                // Otherwise, create a new result
                result = new StyleCheckResult();
                result.setId(id);
            }

            result.setResult(styleCheckResult);
            result.setHomework(homework);
            result.setStudent(student);

            styleCheckResultDao.save(result);
            id++;
        }


        return compilerOut;
    }

}
