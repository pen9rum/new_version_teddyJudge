package com.Teddy.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.util.List;

/**
 * Author: Your Name
 *
 * This class represents the entity for a Student.
 * It contains fields for the student's id, password, name, color,
 * and a one-to-many association to a list of StyleCheckResult entities.
 *
 * @author Your Name
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    /**
     * This is the unique identifier for the Student entity.
     */
    @Id
    private Long id;

    /**
     * This represents the student's password.
     */
    private String password;

    /**
     * This represents the student's name.
     */
    private String name;

    /**
     * This represents the student's preferred color.
     * It could be used for UI customization or categorization purposes.
     */
    private String color;

    /**
     * This represents a one-to-many association with the StyleCheckResult entity.
     * The fetch type is LAZY, which means the association will be fetched when needed.
     */
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "student")
    private List<StyleCheckResult> styleCheckResults;
}
