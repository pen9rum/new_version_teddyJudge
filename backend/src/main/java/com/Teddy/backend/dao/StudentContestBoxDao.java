package com.Teddy.backend.dao;

import com.Teddy.backend.entity.Contest;
import com.Teddy.backend.entity.Homework;
import com.Teddy.backend.entity.StudentContestBox;
import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

/**
 * Author: Your Name
 *
 * This interface represents the Data Access Object (DAO) for the StudentContestBox entity.
 * It extends Spring's CrudRepository interface to inherit basic CRUD operations.
 *
 * It includes two query methods to find a StudentContestBox by its contest name and by both the contest name and id.
 *
 * @author Your Name
 */
public interface StudentContestBoxDao extends CrudRepository<StudentContestBox, Long> {

    /**
     * This method finds a StudentContestBox by its contest name.
     * It returns an Optional that will contain the StudentContestBox if it exists, or be empty if it does not.
     *
     * @param contestName the name of the contest to find
     * @return an Optional containing the found StudentContestBox or empty if not found
     */
    Optional<StudentContestBox> findByContestname(String contestName);

    /**
     * This method finds a StudentContestBox by its contest name and id.
     * It returns an Optional that will contain the StudentContestBox if it exists, or be empty if it does not.
     *
     * @param contestName the name of the contest to find
     * @param id the id of the StudentContestBox to find
     * @return an Optional containing the found StudentContestBox or empty if not found
     */
    Optional<StudentContestBox> findByContestnameAndId(String contestName, Long id);
}
