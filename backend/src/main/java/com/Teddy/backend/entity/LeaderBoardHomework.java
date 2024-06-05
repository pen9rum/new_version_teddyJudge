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
public class LeaderBoardHomework {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String homeworkName;

    @OneToMany(mappedBy = "leaderBoardHomework", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HomeworkRankItem> rankItems;

}