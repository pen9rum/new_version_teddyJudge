package com.Teddy.backend.service;

import com.Teddy.backend.model.ValidContributor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.Teddy.backend.dao.StudentDao;
import com.Teddy.backend.entity.Student;
import com.Teddy.backend.model.StudentBO;

import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentDao studentDao;

    @Autowired
    private ValidContributor validContributor;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public boolean add(StudentBO bo) {
        if (validContributor.isStudentValidId(bo.getId()) == false) {
            return false;
        }
        Student entity = new Student();
        entity.setId(bo.getId());
        entity.setName("同學");
        // Encrypt password before saving to database
        String encodedPassword = bCryptPasswordEncoder.encode(bo.getPassword());
        entity.setPassword(encodedPassword);
        studentDao.save(entity);
        return true;
    }

    public boolean validateLogin(Long id, String password) {
        Optional<Student> studentOptional = studentDao.findById(id);
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            // Use the password encoder to check if the raw password matches the hashed one
            return bCryptPasswordEncoder.matches(password, student.getPassword());
        }
        return false;
    }

    public String getStudentNameById(Long id) {
        Optional<Student> studentOptional = studentDao.findById(id);
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            return student.getName();
        }
        return "";
    }

    public void updateStudent(StudentBO studentbo) {
        if(studentbo.getPassword()!="") {
            studentbo.setPassword(bCryptPasswordEncoder.encode(studentbo.getPassword()));
        }
        Optional<Student> studentOptional = studentDao.findById(studentbo.getId());
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            if(studentbo.getPassword()!="") {
                student.setPassword(studentbo.getPassword());
            }
            student.setName(studentbo.getName());
            studentDao.save(student);
        } else {
            // Handle the case where the student with the given ID does not exist
        }
    }


}
