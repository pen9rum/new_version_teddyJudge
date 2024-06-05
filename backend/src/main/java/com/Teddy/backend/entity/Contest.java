package com.Teddy.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import jakarta.persistence.*;
import java.util.List;

/**
 * Author: Your Name
 *
 * This class represents the entity for a Contest.
 * It includes fields for the contest id, contest name, total score,
 * start time, end time, and a list of associated Homework entities.
 *
 * @author Your Name
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contest {

    /**
     * This is the unique identifier for the Contest entity.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    /**
     * This represents the name of the contest.
     */
    private String contestname;

    /**
     * This represents the total score for the contest.
     */
    private int totalscore;

    /**
     * This represents the start time for the contest.
     */
    private Date startTime;

    /**
     * This represents the end time for the contest.
     */
    private Date endTime;

    /**
     * This represents a one-to-many association with the Homework entity.
     * The fetch type is LAZY, which means the association will be fetched when needed.
     */
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "contest")
    private List<Homework> homeworks;
}
