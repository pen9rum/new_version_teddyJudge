package com.Teddy.backend.model;
import java.util.Locale;
import java.util.concurrent.TimeUnit;
import java.util.Date;
import java.text.SimpleDateFormat;

public class TimeCalculator {





    public boolean endtime_in_zone(Date endtime)
    {
        SimpleDateFormat sdf = new  SimpleDateFormat("MM/DD/YYYY,HR:MIN",  Locale.ENGLISH);
        Date firstdate =new Date();
        Date seconddate = endtime;
        long diff =seconddate.getTime()-firstdate.getTime();
        TimeUnit time= TimeUnit.DAYS;
        long difference = time.convert(diff,TimeUnit.MILLISECONDS);
        if(difference > 0) return true;
        else return false;
    }
    public boolean starttime_in_zone(Date starttime)
    {
        SimpleDateFormat sdf = new  SimpleDateFormat("MM/DD/YYYY,HR:MIN",  Locale.ENGLISH);
        Date firstdate =starttime;
        Date seconddate = new Date();
        long diff =seconddate.getTime()-firstdate.getTime();
        TimeUnit time= TimeUnit.DAYS;
        long difference = time.convert(diff,TimeUnit.MILLISECONDS);
        if(difference > 0) return true;
        else return false;
    }
    public boolean available_submit_time(Date starttime, Date endtime) //可用來計算競賽模式和作業模式時間
    {
        if(starttime_in_zone(starttime) == true && endtime_in_zone(endtime) ==true)
        {
            return true;
        }
        else return false;
    }
    //String userTime = request.getParameter("userTime");

    // display time and date using toString()

}
