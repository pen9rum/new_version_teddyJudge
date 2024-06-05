package com.Teddy.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContestRankItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "leaderBoardContest_id", nullable = false)
    private LeaderBoardContest leaderBoardContest;

    @Column(name = "`rank`")
    private int rank;
    private Long sId;
    private int totalScore;
    @ElementCollection
    private List<Double> eachQuestionScore;
}
