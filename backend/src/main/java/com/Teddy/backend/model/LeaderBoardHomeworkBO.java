package com.Teddy.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaderBoardHomeworkBO {
    private Long id;
    private String homeworkName;
    private List<HomeworkRankItemBO> rankItems;
}
