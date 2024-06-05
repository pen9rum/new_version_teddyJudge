package com.Teddy.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaderBoardContest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "contest_id", nullable = false)
    private Contest contest;

    @OneToMany(mappedBy = "leaderBoardContest", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ContestRankItem> rankItems;

}