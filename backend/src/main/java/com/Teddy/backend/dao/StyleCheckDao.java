package com.Teddy.backend.dao;

import com.Teddy.backend.entity.Homework;
import com.Teddy.backend.entity.Student;
import com.Teddy.backend.entity.StyleCheck;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

/**
 * Author: Your Name
 *
 * This interface represents the Data Access Object (DAO) for the StyleCheck entity.
 * It extends Spring's CrudRepository interface to inherit basic CRUD operations.
 *
 * It includes two query methods to find StyleChecks by the Homework object and by both id and the Homework object.
 *
 * @author Your Name
 */
public interface StyleCheckDao extends CrudRepository<StyleCheck, Long> {

    /**
     * This method finds a list of StyleChecks associated with a particular Homework object.
     *
     * @param homework the Homework object to find StyleChecks for
     * @return a list of StyleChecks associated with the given Homework object
     */
    List<StyleCheck> findByHomework(Homework homework);

    /**
     * This method finds a StyleCheck by its id and associated Homework object.
     * It returns an Optional that will contain the StyleCheck if it exists, or be empty if it does not.
     *
     * @param id the id of the StyleCheck to find
     * @param homework the Homework object associated with the StyleCheck to find
     * @return an Optional containing the found StyleCheck or empty if not found
     */
    Optional<StyleCheck> findByIdAndHomework(Long id, Homework homework);
}
