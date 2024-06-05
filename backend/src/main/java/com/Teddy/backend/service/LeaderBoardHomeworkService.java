package com.Teddy.backend.service;

import com.Teddy.backend.dao.StudentHomeworkBoxDao;
import com.Teddy.backend.dao.HomeworkRankItemDao;
import com.Teddy.backend.dao.LeaderBoardHomeworkDao;
import com.Teddy.backend.entity.StudentHomeworkBox;
import com.Teddy.backend.entity.HomeworkRankItem;
import com.Teddy.backend.entity.LeaderBoardHomework;
import com.Teddy.backend.model.LeaderBoardHomeworkBO;
import com.Teddy.backend.model.HomeworkRankItemBO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeaderBoardHomeworkService {

    @Autowired
    private StudentHomeworkBoxDao studentHomeworkBoxDao;

    @Autowired
    private HomeworkRankItemDao homeworkRankItemDao;

    @Autowired
    private LeaderBoardHomeworkDao leaderBoardHomeworkDao;
    @Transactional

    public void update(String homeworkName) {
        System.out.println("update leaderboardhomework");

        // Step 1: Get all StudentHomeworkBox records by homeworkName
        List<StudentHomeworkBox> studentHomeworkBoxes = studentHomeworkBoxDao.findByHomeworkName(homeworkName);

        // Step 2: Calculate total scores and sort the studentHomeworkBoxes by total score in descending order
        List<StudentHomeworkBox> sortedHomeworkBoxes = studentHomeworkBoxes.stream()
                .sorted((a, b) -> Double.compare(
                        b.getScores().stream().mapToDouble(Double::doubleValue).sum(),
                        a.getScores().stream().mapToDouble(Double::doubleValue).sum()
                ))
                .collect(Collectors.toList());

        for(int i=0; i<sortedHomeworkBoxes.size(); i++){
            System.out.println(sortedHomeworkBoxes.get(i).getScores());
        }

        // Step 3: Get or create the LeaderBoardHomework by homeworkName
        LeaderBoardHomework leaderBoardHomework = leaderBoardHomeworkDao.findByHomeworkName(homeworkName).orElse(null);
        if (leaderBoardHomework == null) {
            leaderBoardHomework = new LeaderBoardHomework();
            leaderBoardHomework.setHomeworkName(homeworkName); // Assuming LeaderBoardHomework has a homeworkName field
            leaderBoardHomework = leaderBoardHomeworkDao.save(leaderBoardHomework);
        }

        // Step 4: Delete old HomeworkRankItem records
        homeworkRankItemDao.deleteByLeaderBoardHomework(leaderBoardHomework);

        // Step 5: Create new HomeworkRankItem records with updated rank
        int rank = 1;
        double lastScore = -1;
        int count = 0;

        for (StudentHomeworkBox box : sortedHomeworkBoxes) {
            double totalScore = box.getScores().stream().mapToDouble(Double::doubleValue).sum();
            if (totalScore != lastScore) {
                rank += count;
                count = 1;
                lastScore = totalScore;
            } else {
                count++;
            }

            HomeworkRankItem rankItem = new HomeworkRankItem();
            rankItem.setLeaderBoardHomework(leaderBoardHomework);
            rankItem.setRank(rank);
            rankItem.setSId(box.getId());
            rankItem.setScore(totalScore);
            System.out.println(rankItem.getId());
            homeworkRankItemDao.save(rankItem);
        }
    }

    public LeaderBoardHomeworkBO convertToBo(LeaderBoardHomework leaderBoardHomework) {
        List<HomeworkRankItemBO> rankItems = leaderBoardHomework.getRankItems().stream()
                .map(this::convertToBo)
                .collect(Collectors.toList());
        return new LeaderBoardHomeworkBO(leaderBoardHomework.getId(), leaderBoardHomework.getHomeworkName(), rankItems);
    }

    public LeaderBoardHomeworkBO getLeaderBoardHomeworkByHomeworkName(String homeworkName) {
        LeaderBoardHomework leaderBoardHomework = leaderBoardHomeworkDao.findByHomeworkName(homeworkName).orElse(null);
        if (leaderBoardHomework != null) {
            return convertToBo(leaderBoardHomework);
        }
        return null;
    }

    public HomeworkRankItemBO convertToBo(HomeworkRankItem rankItem) {
        return new HomeworkRankItemBO(rankItem.getId(), rankItem.getRank(), rankItem.getSId(), rankItem.getScore());
    }

    public LeaderBoardHomework convertToEntity(LeaderBoardHomeworkBO bo) {
        LeaderBoardHomework leaderBoardHomework = new LeaderBoardHomework();
        leaderBoardHomework.setId(bo.getId());
        leaderBoardHomework.setHomeworkName(bo.getHomeworkName());
        List<HomeworkRankItem> rankItems = bo.getRankItems().stream()
                .map(this::convertToEntity)
                .collect(Collectors.toList());
        leaderBoardHomework.setRankItems(rankItems);
        return leaderBoardHomework;
    }

    public HomeworkRankItem convertToEntity(HomeworkRankItemBO bo) {
        HomeworkRankItem rankItem = new HomeworkRankItem();
        rankItem.setId(bo.getId());
        rankItem.setRank(bo.getRank());
        rankItem.setSId(bo.getSId());
        rankItem.setScore(bo.getScore());
        return rankItem;
    }
}
