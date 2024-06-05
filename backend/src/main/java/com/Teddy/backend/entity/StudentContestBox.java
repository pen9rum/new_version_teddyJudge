package com.Teddy.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import jakarta.persistence.*;

/**
 * Author: Your Name
 *
 * This class represents the entity for a StudentContestBox.
 * It includes the contest name, a unique student id, a total score,
 * and a list of individual question scores.
 *
 * @author Your Name
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentContestBox {

    /**
     * This represents the name of the contest.
     */
    private String contestname;

    /**
     * This is the unique identifier for the StudentContestBox entity.
     */
    @Id
    private long id;

    /**
     * This represents the total score of the student in the contest.
     */
    private double totalscore;

    /**
     * This represents a list of scores for individual questions in the contest.
     */
    @ElementCollection
    private List<Double> questionscore;
}
