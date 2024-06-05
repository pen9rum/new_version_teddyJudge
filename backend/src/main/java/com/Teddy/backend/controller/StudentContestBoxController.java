package com.Teddy.backend.controller;

import com.Teddy.backend.model.StudentContestBoxBO;
import com.Teddy.backend.model.StudentHomeworkBoxBO;
import com.Teddy.backend.service.StudentContestBoxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/student_contest")
public class StudentContestBoxController {
    @Autowired
    private StudentContestBoxService studentContestBoxService;

    @PostMapping("/add_student_contest")
    public ResponseEntity<Void> addStudentContestBox(@RequestBody StudentContestBoxBO studentBo) {
        if(studentContestBoxService.add(studentBo)==false)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/get_total_score")
    public ResponseEntity<Double> getTotalScore(@RequestBody StudentContestBoxBO studentBo) {
        return  ResponseEntity.ok(studentContestBoxService.getTotalScore(studentBo));

    }



    @PostMapping("/get_average_score")
    public ResponseEntity<Double> getAverageScore(@RequestBody StudentContestBoxBO studentBo) {
        return  ResponseEntity.ok(studentContestBoxService.getAverageScore(studentBo));

    }



}
