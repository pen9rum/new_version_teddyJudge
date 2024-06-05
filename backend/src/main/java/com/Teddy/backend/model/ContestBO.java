package com.Teddy.backend.model;

import com.Teddy.backend.entity.Homework;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/**
 * This class represents a Business Object (BO) for Contest.
 * A Business Object represents a value or an object in the business domain,
 * including a full set of methods to manipulate its encapsulated data.
 *
 * The class uses Lombok annotations for boilerplate code reduction:
 * - @Data generates getters for all fields, a useful toString method,
 *   and hashCode and equals implementations that check all non-transient fields.
 * - @NoArgsConstructor creates a constructor with no parameters.
 * - @AllArgsConstructor generates a constructor with a parameter for each field in your class.
 *
 * Fields are the 'id', 'contestname', 'totalscore', 'averagescore',
 * 'startTime', 'endTime', and 'homeworks' of the Contest.
 *
 * @author Your Name
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContestBO {

    /**
     * The ID of the contest.
     */
    private long id;

    /**
     * The name of the contest.
     */
    private String contestname;

    /**
     * The total score of the contest.
     */
    private int totalscore;

    /**
     * The average score of the contest.
     */
    private int averagescore;

    /**
     * The start time of the contest.
     */
    private Date startTime;

    /**
     * The end time of the contest.
     */
    private Date endTime;

    /**
     * The list of homework business objects associated with the contest.
     */
    private List<HomeworkBO> homeworks;
}
