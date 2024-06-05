package com.Teddy.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

/**
 * Author:
 *
 * This class represents the entity for style checks.
 * It contains a unique identifier id,
 * as well as a many-to-one association with a Homework entity.
 * It also includes characteristics of the code such as function name and function type.
 *
 * @author
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StyleCheck {

    /**
     * This is the unique identifier for the StyleCheck entity.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * This represents a many-to-one association with the Homework entity.
     */
    @ManyToOne
    @JoinColumn(name = "homeworkName", nullable = false)
    private Homework homework;

    /**
     * This represents the function name in the code style check.
     */
    @Lob
    private String functionName;

    /**
     * This represents the function type in the code style check.
     */
    @Lob
    private String functionType;
}
