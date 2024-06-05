package com.Teddy.backend.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.Teddy.backend.entity.Student;
import java.util.Optional;

/**
 * Author: Your Name
 *
 * This interface represents the Data Access Object (DAO) for the Student entity.
 * It extends Spring's CrudRepository interface to inherit basic CRUD operations.
 *
 * It includes a query method to find a Student by its id.
 *
 * @author Your Name
 */
@Repository
public interface StudentDao extends CrudRepository<Student, Long>{

    /**
     * This method finds a Student by its id.
     * It returns an Optional that will contain the Student if it exists, or be empty if it does not.
     *
     * @param id the id of the Student to find
     * @return an Optional containing the found Student or empty if not found
     */
    Optional<Student> findById(Long id);
}
