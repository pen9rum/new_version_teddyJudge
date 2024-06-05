package com.Teddy.backend.dao;

import com.Teddy.backend.entity.Teacher;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * This interface represents the Data Access Object (DAO) for the Teacher entity.
 * It extends Spring's CrudRepository interface to inherit basic CRUD operations.
 *
 * It includes a query method to find a Teacher by ID.
 *
 * @author Your Name
 */
@Repository
public interface TeacherDao extends CrudRepository<Teacher, Long> {

    /**
     * This method finds a Teacher by its ID.
     * It returns an Optional that will contain the Teacher if it exists, or be empty if it does not.
     *
     * @param id the ID of the Teacher to find
     * @return an Optional containing the found Teacher or empty if not found
     */
    Optional<Teacher> findById(String id);
}
