package com.Teddy.backend.service;

import com.Teddy.backend.dao.ContestDao;
import com.Teddy.backend.dao.HomeworkDao;
import com.Teddy.backend.entity.Contest;
import com.Teddy.backend.entity.Homework;
import com.Teddy.backend.model.CalendarBo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CalendarService {
    @Autowired
    private HomeworkDao homeworkDao;

    @Autowired
    private ContestDao contestDao;

    public List<CalendarBo> getCalendar(){
        List<CalendarBo> ret = new ArrayList<CalendarBo>();

        List<Homework> homeworks =  homeworkDao.findAll();
        for(int i=0; i<homeworks.size(); i++){
            Homework cur = homeworks.get(i);
            if(cur.isHomework()){
                CalendarBo item = new CalendarBo();
                item.setTitle(cur.getHomeworkName());
                item.setStartTime(cur.getStartTime());
                item.setEndTime(cur.getEndTime());
                item.setHomework(true);
                ret.add(item);
            }
        }

        List<Contest> contests = contestDao.findAll();
        for(int i=0; i<contests.size(); i++){
            Contest cur = contests.get(i);
            CalendarBo item = new CalendarBo();
            item.setTitle(cur.getContestname());
            item.setStartTime(cur.getStartTime());
            item.setEndTime(cur.getEndTime());
            item.setHomework(false);
            ret.add(item);
        }
        return ret;
    }


}
