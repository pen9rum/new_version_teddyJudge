package com.Teddy.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Teddy.backend.dao.StudentContestBoxDao;
import com.Teddy.backend.entity.StudentContestBox;
import com.Teddy.backend.model.StudentContestBoxBO;
import java.util.Optional;

@Service
public class StudentContestBoxService {
    @Autowired
    private StudentContestBoxDao studentcontestboxDao;

    public boolean add(StudentContestBoxBO bo) {
        StudentContestBox entity = new StudentContestBox();
        entity.setContestname(bo.getContestname());
        entity.setId(bo.getId());
        studentcontestboxDao.save(entity);
        return true;
    }

    public double getTotalScore(StudentContestBoxBO bo)
    {
        double helptotalscore=0.00;
        Optional<StudentContestBox> studentcontestbox = studentcontestboxDao.findByContestnameAndId(bo.getContestname(),bo.getId());
        if(studentcontestbox.isPresent()) {
            for (double totalscore :studentcontestbox.get().getQuestionscore() ) {
                helptotalscore += totalscore;
            }
            return helptotalscore;
        }
        else
            return 0.00;
    }

    public double getAverageScore(StudentContestBoxBO bo)
    {
        double helptotalscore=0.00;
        Optional<StudentContestBox> studentcontestbox = studentcontestboxDao.findByContestnameAndId(bo.getContestname(),bo.getId());
        if(studentcontestbox.isPresent()) {
            for (double totalscore :studentcontestbox.get().getQuestionscore() ) {
                helptotalscore += totalscore;
            }
            return helptotalscore/studentcontestbox.get().getQuestionscore().size();
        }
        else
            return 0.00;
    }
}
