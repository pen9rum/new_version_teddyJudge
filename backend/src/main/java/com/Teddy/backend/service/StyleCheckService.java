package com.Teddy.backend.service;

import com.Teddy.backend.dao.StudentDao;
import com.Teddy.backend.entity.Homework;
import com.Teddy.backend.dao.HomeworkDao;
import com.Teddy.backend.dao.StyleCheckDao;
import com.Teddy.backend.entity.Student;
import com.Teddy.backend.entity.StyleCheckResult;
import com.Teddy.backend.dao.StyleCheckResultDao;
import com.Teddy.backend.model.StyleCheckBO;
import com.Teddy.backend.entity.StyleCheck;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StyleCheckService {

    @Autowired
    private StyleCheckDao styleCheckDao;
    @Autowired
    private HomeworkDao homeworkDao;

    @Autowired
    private StyleCheckResultDao styleCheckResultDao;

    @Autowired
    private StudentDao studentDao;

    public void addStyleCheck(StyleCheckBO bo){
        System.out.println(bo.getHomeworkName());
        // Find the homework by its name
        Optional<Homework> homework = homeworkDao.findByHomeworkName(bo.getHomeworkName());
        if (!homework.isPresent()) {
            throw new RuntimeException("Homework not found");
        }

        // Create or update StyleChecks
        for (int i = 0; i < bo.getFunctionName().size(); i++) {
            Long id = Long.valueOf(i+1);
            Optional<StyleCheck> optionalStyleCheck = styleCheckDao.findByIdAndHomework(id, homework.get());
            StyleCheck styleCheck;
            if (optionalStyleCheck.isPresent()) {
                // If the StyleCheck already exists, update it
                styleCheck = optionalStyleCheck.get();
            } else {
                // If the StyleCheck does not exist, create a new one
                styleCheck = new StyleCheck();
                styleCheck.setId(id);
                styleCheck.setHomework(homework.get());
            }
            styleCheck.setFunctionName(bo.getFunctionName().get(i));
            styleCheck.setFunctionType(bo.getFunctionType().get(i));
            // Save it to the database
            styleCheckDao.save(styleCheck);
        }
    }


    public List<String> getStyleCheck(Long student_id, String homeworkName){
        Optional<Student> studentOptional = studentDao.findById(student_id);
        Optional<Homework> homeworkOptional = homeworkDao.findByHomeworkName(homeworkName);


        List<StyleCheckResult> results = styleCheckResultDao.findByHomeworkAndStudent(homeworkOptional.get(),studentOptional.get());
        // map StyleCheckResult to its result field
        List<String> resultStrings = results.stream()
                .map(StyleCheckResult::getResult)
                .collect(Collectors.toList());
        return resultStrings;
    }

}

