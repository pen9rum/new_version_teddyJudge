package com.Teddy.backend.service;
import com.Teddy.backend.dao.CourseDao;
import com.Teddy.backend.entity.Course;
import com.Teddy.backend.entity.Homework;
import com.Teddy.backend.model.CourseBO;
import com.Teddy.backend.model.HomeworkBO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Teddy.backend.dao.CourseDao;
import com.Teddy.backend.entity.Course;
import com.Teddy.backend.model.CourseBO;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class CourseService {

    @Autowired
    private CourseDao courseDao;

    public boolean add(CourseBO bo) {
        Course entity = new Course();
        entity.setCoursename(bo.getCoursename());
        entity.setPDF(bo.getPDF()); // PDF is now a byte[]
        courseDao.save(entity);
        return true;
    }

    public List<CourseBO> getAll() {
        List<Course> courses = courseDao.findAll();
        List<CourseBO> courseBOs = new ArrayList<>();

        for (Course course : courses) {

            CourseBO bo = new CourseBO();

            bo.setCoursename(course.getCoursename());

            // Add the URL for the PDF file
            bo.setPdfUrl("/course/" + course.getCoursename() + "/pdf");
            courseBOs.add(bo);
        }
        return courseBOs;
    }

    public byte[] getPdf(String courseName) {
        Optional<Course> course = courseDao.findByCoursename(courseName);
        if (course.isPresent()) {
            return course.get().getPDF();
        } else {
            return null;
        }
    }

}
