package com.Teddy.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.List;
import jakarta.persistence.*;

/**
 * Author: Your Name
 *
 * This class represents the entity for a Homework.
 * It contains fields for the homework name, PDF content, start and end time, average score,
 * and associations with TestCase, Contest, StyleCheck, and StyleCheckResult entities.
 *
 * @author Your Name
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Homework {

    /**
     * This is the unique identifier for the Homework entity.
     */
    @Id
    private String homeworkName;

    /**
     * This represents the PDF content associated with the homework.
     * Stored as a large object (Lob) in the database.
     */
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] PDF;

    /**
     * This represents the start time for the homework.
     */
    private Date startTime;

    /**
     * This represents the end time for the homework.
     */
    private Date endTime;

    /**
     * This represents the average score for the homework.
     */
    private float average;

    private boolean isHomework;

    /**
     * This represents a one-to-many association with the TestCase entity.
     */
    @OneToMany(mappedBy = "homework", cascade = CascadeType.ALL)
    private List<TestCase> testCases;

    /**
     * This represents a many-to-one association with the Contest entity.
     * The fetch type is LAZY, which means the association will be fetched when needed.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id", nullable = true)
    private Contest contest;

    /**
     * This represents a one-to-many association with the StyleCheck entity.
     */
    @OneToMany(mappedBy = "homework", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private List<StyleCheck> styleChecks;

    /**
     * This represents a one-to-many association with the StyleCheckResult entity.
     */
    @OneToMany(mappedBy = "homework", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = false)
    private List<StyleCheckResult> styleCheckResult;
}
