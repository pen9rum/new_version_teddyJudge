package com.Teddy.backend.dao;

import com.Teddy.backend.entity.Homework;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.Teddy.backend.entity.Contest;
import java.util.List;
import java.util.Optional;

/**
 * Author: Your Name
 *
 * This interface represents the Data Access Object (DAO) for the Contest entity.
 * It extends Spring's CrudRepository interface to inherit basic CRUD operations.
 *
 * It includes two query methods to find a Contest by its name and to find all Contests.
 *
 * @author Your Name
 */
@Repository
public interface ContestDao extends CrudRepository<Contest, Long>{

    /**
     * This method finds a Contest by its name.
     * It returns an Optional that will contain the Contest if it exists, or be empty if it does not.
     *
     * @param contestname the name of the contest to find
     * @return an Optional containing the found Contest or empty if not found
     */
    Optional<Contest> findByContestname(String contestname);

    /**
     * This method returns all Contests in the database.
     *
     * @return a list of all Contests
     */
    List<Contest> findAll();
}
