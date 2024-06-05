package com.Teddy.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalendarBo {

    private Date startTime;

    /**
     * This represents the end time for the homework.
     */
    private Date endTime;

    private boolean isHomework;

    private String title;
}
