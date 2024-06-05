package com.Teddy.backend.controller;

import com.Teddy.backend.model.LeaderBoardHomeworkBO;
import com.Teddy.backend.service.LeaderBoardHomeworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")  // Replace with your frontend origin
@RestController
@RequestMapping("/leaderboardhomework")
public class LeaderBoardHomeworkController {

    @Autowired
    private LeaderBoardHomeworkService leaderBoardHomeworkService;

    @GetMapping("/getRank/{homeworkName}")
    public ResponseEntity<LeaderBoardHomeworkBO> getRank(@PathVariable("homeworkName") String homeworkName) {

        System.out.println(homeworkName);
        LeaderBoardHomeworkBO leaderBoardHomeworkBO = leaderBoardHomeworkService.getLeaderBoardHomeworkByHomeworkName(homeworkName);
        if (leaderBoardHomeworkBO != null) {
            return ResponseEntity.ok(leaderBoardHomeworkBO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
