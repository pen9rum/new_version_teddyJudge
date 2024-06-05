package com.Teddy.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

/**
 * Author: Your Name
 *
 * This class represents the entity for the results of a style check.
 * It contains a unique identifier id,
 * the result of the check, and associations to a Student and Homework entity.
 *
 * @author Your Name
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StyleCheckResult {

    /**
     * This is the unique identifier for the StyleCheckResult entity.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * This represents the result of the style check.
     */
    private String result;

    /**
     * This represents a many-to-one association with the Student entity.
     * The fetch type is LAZY, which means the association will be fetched when needed.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    /**
     * This represents a many-to-one association with the Homework entity.
     */
    @ManyToOne
    @JoinColumn(name = "homeworkName", nullable = false)
    private Homework homework;
}
