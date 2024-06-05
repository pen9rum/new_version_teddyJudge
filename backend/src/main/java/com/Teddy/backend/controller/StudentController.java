package com.Teddy.backend.controller;

import com.Teddy.backend.model.StudentBO;
import com.Teddy.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/add")
    public ResponseEntity<Void> addStudent(@RequestBody StudentBO studentBo) {

        if(studentService.add(studentBo)==false)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Void> studentLogin(@RequestParam("id") Long id, @RequestParam("password") String password) {
        if (studentService.validateLogin(id, password)) {
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/getNameById/{studentId}")
    public ResponseEntity<String> getStudentNameById(@PathVariable("studentId") Long id) {
        return ResponseEntity.ok(studentService.getStudentNameById(id));
    }

    @PutMapping("/update")
    public ResponseEntity<Void> updateStudent(@RequestBody StudentBO studentBo) {
        studentService.updateStudent(studentBo);
        return new ResponseEntity<>(HttpStatus.OK);
    }



}
