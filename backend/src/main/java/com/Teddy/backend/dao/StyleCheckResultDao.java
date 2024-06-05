package com.Teddy.backend.dao;

import com.Teddy.backend.entity.Homework;
import com.Teddy.backend.entity.Student;
import com.Teddy.backend.entity.StyleCheckResult;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

/**
 * Author: Your Name
 *
 * This interface represents the Data Access Object (DAO) for the StyleCheckResult entity.
 * It extends Spring's CrudRepository interface to inherit basic CRUD operations.
 *
 * It includes two query methods to find StyleCheckResults by the Homework object, Student object and ID, and
 * by the Homework and Student objects.
 *
 * @author Your Name
 */
public interface StyleCheckResultDao extends CrudRepository<StyleCheckResult, Long> {

    /**
     * This method finds a StyleCheckResult by its associated Homework object, Student object and its ID.
     * It returns an Optional that will contain the StyleCheckResult if it exists, or be empty if it does not.
     *
     * @param homework the Homework object associated with the StyleCheckResult to find
     * @param student the Student object associated with the StyleCheckResult to find
     * @param id the id of the StyleCheckResult to find
     * @return an Optional containing the found StyleCheckResult or empty if not found
     */
    Optional<StyleCheckResult> findByHomeworkAndStudentAndId(Homework homework, Student student, Long id);

    /**
     * This method finds a list of StyleCheckResults associated with a particular Homework object and Student object.
     *
     * @param homework the Homework object to find StyleCheckResults for
     * @param student the Student object to find StyleCheckResults for
     * @return a list of StyleCheckResults associated with the given Homework and Student objects
     */
    List<StyleCheckResult> findByHomeworkAndStudent(Homework homework, Student student);
}
