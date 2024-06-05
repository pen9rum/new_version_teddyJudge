package com.Teddy.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;



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
public class HomeworkRankItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "leaderBoardHomework_id", nullable = false)
    private LeaderBoardHomework leaderBoardHomework;

    @Column(name = "`rank`")
    private int rank;
    private Long sId;
    private Double score;
}
