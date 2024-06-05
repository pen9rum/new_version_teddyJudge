package com.Teddy.backend.dao;

import com.Teddy.backend.entity.Contest;
import com.Teddy.backend.entity.Homework;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.Teddy.backend.entity.Course;
import java.util.List;
import java.util.Optional;

/**
 * Author: Your Name
 *
 * This interface represents the Data Access Object (DAO) for the Course entity.
 * It extends Spring's CrudRepository interface to inherit basic CRUD operations.
 *
 * It includes two query methods to find a Course by its name and to find all Courses.
 *
 * @author Your Name
 */
@Repository
public interface CourseDao extends CrudRepository<Course, Long>{

    /**
     * This method finds a Course by its name.
     * It returns an Optional that will contain the Course if it exists, or be empty if it does not.
     *
     * @param coursename the name of the course to find
     * @return an Optional containing the found Course or empty if not found
     */
    Optional<Course> findByCoursename(String coursename);

    /**
     * This method returns all Courses in the database.
     *
     * @return a list of all Courses
     */
    List<Course> findAll();
}
