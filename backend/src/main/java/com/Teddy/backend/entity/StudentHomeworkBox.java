package com.Teddy.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * Author: Your Name
 *
 * This class represents the entity for a StudentHomeworkBox.
 * It includes a composite identifier comprising a student id and homework name,
 * a list of scores, source code, and result.
 *
 * @author Your Name
 */
@Entity
@IdClass(StudentHomeworkId.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentHomeworkBox {

    /**
     * This is the student id part of the composite identifier.
     */
    @Id
    private Long id;

    /**
     * This is the homework name part of the composite identifier.
     */
    @Id
    private String homeworkName;

    /**
     * This represents a list of scores associated with the student for the homework.
     */
    @ElementCollection
    private List<Double> scores;

    /**
     * This represents the source code submitted by the student for the homework.
     * Stored as a large object (Lob) in the database.
     */
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private String sourceCode;

    /**
     * This represents the result of evaluating the student's homework.
     */
    private String result;
}
