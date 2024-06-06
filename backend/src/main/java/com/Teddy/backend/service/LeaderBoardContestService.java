package com.Teddy.backend.service;

import com.Teddy.backend.dao.StudentHomeworkBoxDao;
import com.Teddy.backend.dao.HomeworkRankItemDao;
import com.Teddy.backend.dao.LeaderBoardHomeworkDao;
import com.Teddy.backend.dao.ContestDao;
import com.Teddy.backend.entity.*;
import com.Teddy.backend.model.LeaderBoardContestItem;
import com.Teddy.backend.model.LeaderBoardHomeworkBO;
import com.Teddy.backend.model.HomeworkRankItemBO;
import com.Teddy.backend.model.LeaderBoardContestBO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.Comparator;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LeaderBoardContestService {

    @Autowired
    private  ContestDao contestDao;

    @Autowired
    private LeaderBoardHomeworkDao leaderBoardHomeworkDao;
    public LeaderBoardContestBO getContest(String contestName) {
        LeaderBoardContestBO ret = new LeaderBoardContestBO();
        ret.setContestName(contestName);
        ret.leaderBoardContestItems = new ArrayList<>();
        Optional<Contest> contestOpt = contestDao.findByContestname(contestName);

        if (!contestOpt.isPresent()) {
            return ret; // 如果找不到比賽，返回空的BO
        }

        Contest contest = contestOpt.get();
        List<Homework> homeworks = contest.getHomeworks();

        for (Homework curHomework : homeworks) {
            Optional<LeaderBoardHomework> leaderBoardHomeworkOpt = leaderBoardHomeworkDao.findByHomeworkName(curHomework.getHomeworkName());
            if (!leaderBoardHomeworkOpt.isPresent()) {
                continue; // 如果找不到作業，繼續下一個
            }

            List<HomeworkRankItem> homeworkRankItems = leaderBoardHomeworkOpt.get().getRankItems();
            for (HomeworkRankItem curHomeworkRankItem : homeworkRankItems) {
                long studentId = curHomeworkRankItem.getSId();

                LeaderBoardContestItem item = ret.leaderBoardContestItems.stream()
                        .filter(i -> i.getStudent_id() == studentId)
                        .findFirst()
                        .orElseGet(() -> {
                            LeaderBoardContestItem newItem = new LeaderBoardContestItem();
                            newItem.setStudent_id(studentId);
                            newItem.setQuestion_scores(new ArrayList<>(Collections.nCopies(homeworks.size(), 0.0)));
                            ret.leaderBoardContestItems.add(newItem);
                            return newItem;
                        });

                item.getQuestion_scores().set(homeworks.indexOf(curHomework), curHomeworkRankItem.getScore());
            }
        }

        // 計算總分
        for (LeaderBoardContestItem item : ret.leaderBoardContestItems) {
            double totalScore = item.getQuestion_scores().stream().mapToDouble(Double::doubleValue).sum();
            item.setScore(totalScore);
        }

        // 根據成績和學生ID進行排序
        Collections.sort(ret.leaderBoardContestItems, Comparator.comparingDouble(LeaderBoardContestItem::getScore)
                .reversed()
                .thenComparingLong(LeaderBoardContestItem::getStudent_id));

        double lastScore = -1.0; // 确保没有有效分数会是这个值
        int passRank = 1;
        int rank = 0; // 初始排名为0
        for (LeaderBoardContestItem item : ret.leaderBoardContestItems) {
            double totalScore = item.getScore();
            if (lastScore != totalScore) {
                rank += passRank; // 更新排名为之前的 passRank 总和
                passRank = 1; // 重置 passRank
            } else {
                passRank++; // 分数相同，passRank 加1
            }
            item.setRank(rank); // 设置当前项的排名
            lastScore = totalScore; // 更新 lastScore 为当前项的分数
        }


        return ret;
    }
}
