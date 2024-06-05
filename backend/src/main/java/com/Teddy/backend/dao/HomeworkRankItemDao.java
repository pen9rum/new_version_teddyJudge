package com.Teddy.backend.dao;

import com.Teddy.backend.entity.HomeworkRankItem;
import com.Teddy.backend.entity.LeaderBoardHomework;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Author: Your Name
 *
 * This interface represents the Data Access Object (DAO) for the HomeworkRankItem entity.
 * It extends Spring's CrudRepository interface to inherit basic CRUD operations.
 */
@Repository
public interface HomeworkRankItemDao extends CrudRepository<HomeworkRankItem, Long> {
    void deleteByLeaderBoardHomework(LeaderBoardHomework leaderBoardHomework);
}
