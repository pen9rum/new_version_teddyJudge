package com.Teddy.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaderBoardContestBO {
    private String contestName;
    public List<LeaderBoardContestItem> leaderBoardContestItems;
}
