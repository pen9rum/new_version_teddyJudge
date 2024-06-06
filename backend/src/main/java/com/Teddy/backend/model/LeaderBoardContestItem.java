package com.Teddy.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaderBoardContestItem {
    private int rank;
    private long student_id;
    private double score;
    public List<Double> question_scores;

}
