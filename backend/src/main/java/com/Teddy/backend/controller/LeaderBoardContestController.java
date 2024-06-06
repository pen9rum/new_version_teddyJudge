package com.Teddy.backend.controller;

import com.Teddy.backend.model.LeaderBoardContestBO;
import com.Teddy.backend.model.LeaderBoardHomeworkBO;
import com.Teddy.backend.service.LeaderBoardContestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")  // Replace with your frontend origin
@RestController
@RequestMapping("/leaderboardcontest")
public class LeaderBoardContestController {

    @Autowired
    private LeaderBoardContestService leaderBoardContestService;

    @GetMapping("/getRank/{contestName}")
    public ResponseEntity<LeaderBoardContestBO> getRank(@PathVariable("contestName") String contestName) {

        System.out.println(contestName);
        LeaderBoardContestBO leaderBoardContestBO = leaderBoardContestService.getContest(contestName);
        if (leaderBoardContestBO != null) {
            return ResponseEntity.ok(leaderBoardContestBO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
