package com.Teddy.backend.service;

import com.Teddy.backend.entity.Course;
import com.Teddy.backend.entity.StudentContestBox;
import com.Teddy.backend.model.ValidContributor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.Teddy.backend.dao.StudentHomeworkBoxDao;
import com.Teddy.backend.entity.StudentHomeworkBox;
import com.Teddy.backend.model.StudentHomeworkBoxBO;
import org.springframework.web.bind.annotation.PathVariable;

import java.lang.Math;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class StudentHomeworkBoxService {

    @Autowired
    private StudentHomeworkBoxDao studenthomeworkboxDao;


    public boolean add(StudentHomeworkBoxBO bo) {
        StudentHomeworkBox entity = new StudentHomeworkBox();
        entity.setHomeworkName(bo.getHomeworkName());
        entity.setId(bo.getId()); 
        studenthomeworkboxDao.save(entity);
        return true;
    }

    public List<Double> getHomeworkScoreByID(StudentHomeworkBoxBO bo) {
        Optional<StudentHomeworkBox> studenthomeworkbox = studenthomeworkboxDao.findByHomeworkNameAndId(bo.getHomeworkName(),bo.getId());

        if(studenthomeworkbox.isPresent()) {
            List<Double> originalScores = studenthomeworkbox.get().getScores();
            List<Double> roundedScores = new ArrayList<>();
            for (Double score : originalScores) {
                roundedScores.add((double) Math.round(score)); // 对每个元素进行四舍五入并转换为Double类型
            }
            System.out.println(roundedScores);
            return roundedScores;
        }
        else
            return new ArrayList<>();
    }


    public String getHomeworkResultByID(StudentHomeworkBoxBO bo) {
        Optional<StudentHomeworkBox> studenthomeworkbox = studenthomeworkboxDao.findByHomeworkNameAndId(bo.getHomeworkName(),bo.getId());

        if(studenthomeworkbox.isPresent()) {
            System.out.println(studenthomeworkbox.get().getResult());
            return studenthomeworkbox.get().getResult();
        }
        else
            return "";
    }

    public String getSoourceCodeByID(StudentHomeworkBoxBO bo) {
        Optional<StudentHomeworkBox> studenthomeworkbox = studenthomeworkboxDao.findByHomeworkNameAndId(bo.getHomeworkName(),bo.getId());

        if(studenthomeworkbox.isPresent()) {
            System.out.println(studenthomeworkbox.get().getSourceCode());
            return studenthomeworkbox.get().getSourceCode();
        }
        else
            return "";
    }

    public Double getAverageScoreByHomeworkName(StudentHomeworkBoxBO bo) {
        List<StudentHomeworkBox> studentHomeworkBoxes = studenthomeworkboxDao.findByHomeworkName(bo.getHomeworkName());

        double totalScore = 0.0;
        int totalEntries = 0;

        for (StudentHomeworkBox studentHomeworkBox : studentHomeworkBoxes) {
            List<Double> scoresList = studentHomeworkBox.getScores();
            for (Double score : scoresList) {
                totalScore += score;
            }
            totalEntries++;
        }

        if (totalEntries == 0) {
            return null; // or return some indicator of no scores exist
        }

        return totalScore / totalEntries;
    }


}