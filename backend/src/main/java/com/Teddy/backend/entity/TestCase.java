package com.Teddy.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

/**
 * Author: Your Name
 *
 * This class represents the entity for a TestCase.
 * It contains fields for the TestCase's id, index, actual test case, answer,
 * and a many-to-one association to a Homework entity.
 *
 * @author Your Name
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestCase {

    /**
     * This is the unique identifier for the TestCase entity.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * This represents the index of the test case.
     * It could be used for ordering or referencing the test cases.
     */
    private int testCaseIndex;

    /**
     * This represents the actual test case.
     * Stored as a large object (Lob) in the database.
     */
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private String testCase;

    /**
     * This represents the expected answer for the test case.
     * Stored as a large object (Lob) in the database.
     */
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private String testCaseAnswer;

    /**
     * This represents a many-to-one association with the Homework entity.
     */
    @ManyToOne
    @JoinColumn(name = "homeworkName")
    private Homework homework;
}
