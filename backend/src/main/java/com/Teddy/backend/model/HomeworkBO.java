package com.Teddy.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/**
 * This class represents the Business Object for Homework.
 *
 * The class uses Lombok annotations for boilerplate code reduction:
 * - @Data generates getters for all fields, a useful toString method,
 *   and hashCode and equals implementations that check all non-transient fields.
 * - @NoArgsConstructor creates a constructor with no parameters.
 * - @AllArgsConstructor generates a constructor with a parameter for each field in your class.
 *
 * Fields include homeworkName, PDF, testCase, testCaseAnswer, startTime, endTime, average, pdfUrl, and contestOrNot.
 *
 * @author Your Name
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HomeworkBO {

    /**
     * The name of the homework.
     */
    private String homeworkName;

    /**
     * The PDF file for the homework as a byte array.
     */
    private byte[] PDF;

    /**
     * The list of test cases for the homework.
     */
    private List<String> testCase;

    /**
     * The list of test case answers for the homework.
     */
    private List<String> testCaseAnswer;

    /**
     * The start time of the homework.
     */
    private Date startTime;

    /**
     * The end time of the homework.
     */
    private Date endTime;

    /**
     * The average score of the homework.
     */
    private float average;

    /**
     * The URL for the homework's PDF file.
     */
    private String pdfUrl;

    /**
     * Boolean flag indicating whether the homework is a part of a contest.
     */
    private boolean contestOrNot;
}
