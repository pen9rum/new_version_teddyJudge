package com.Teddy.backend.dao;

import com.Teddy.backend.entity.LeaderBoardHomework;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Author: Your Name
 *
 * This interface represents the Data Access Object (DAO) for the LeaderBoardHomework entity.
 * It extends Spring's CrudRepository interface to inherit basic CRUD operations.
 *
 * It includes a query method to find LeaderBoardHomework by its homework name.
 */
@Repository
public interface LeaderBoardHomeworkDao extends CrudRepository<LeaderBoardHomework, Long> {
    Optional<LeaderBoardHomework> findByHomeworkName(String homeworkName);
}
