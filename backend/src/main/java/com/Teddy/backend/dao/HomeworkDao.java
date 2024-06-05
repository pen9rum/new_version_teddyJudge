package com.Teddy.backend.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.Teddy.backend.entity.Homework;
import java.util.Optional;
import java.util.List;

/**
 * Author: Your Name
 *
 * This interface represents the Data Access Object (DAO) for the Homework entity.
 * It extends Spring's CrudRepository interface to inherit basic CRUD operations.
 *
 * It includes query methods to find a Homework by its name, to find all Homeworks,
 * and to check if a Homework exists by its name.
 *
 * @author Your Name
 */
@Repository
public interface HomeworkDao extends CrudRepository<Homework, Long>{

    /**
     * This method finds a Homework by its name.
     * It returns an Optional that will contain the Homework if it exists, or be empty if it does not.
     *
     * @param homeworkname the name of the homework to find
     * @return an Optional containing the found Homework or empty if not found
     */
    Optional<Homework> findByHomeworkName(String homeworkname);

    /**
     * This method returns all Homeworks in the database.
     *
     * @return a list of all Homeworks
     */
    List<Homework> findAll();

    /**
     * This method checks if a Homework exists by its name.
     *
     * @param homeworkName the name of the homework to check
     * @return true if the homework exists, false otherwise
     */
    boolean existsByHomeworkName(String homeworkName);
}
