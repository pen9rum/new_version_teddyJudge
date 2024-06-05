package com.Teddy.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

/**
 * Author: Your Name
 *
 * This class represents the entity for a Teacher.
 * It contains fields for the teacher's id, name, password, and color.
 *
 * @author Your Name
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {

    /**
     * This is the unique identifier for the Teacher entity.
     */
    @Id
    private String id;

    /**
     * This represents the teacher's name.
     */
    private String name;

    /**
     * This represents the teacher's password.
     */
    private String password;

    /**
     * This represents the teacher's preferred color.
     * It could be used for UI customization or categorization purposes.
     */
    private String color;
}
