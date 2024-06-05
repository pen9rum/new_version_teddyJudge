package com.Teddy.backend.entity;

import java.io.Serializable;
import java.util.Objects;

/**
 * Author: Your Name
 *
 * This class represents the composite identifier for a StudentHomework association.
 * It implements Serializable, as it will be used as an identifier for a Serializable entity.
 * It includes fields for the id and homeworkName, as well as methods for accessing these fields and checking object equality.
 *
 * @author Your Name
 */
public class StudentHomeworkId implements Serializable {

    /**
     * This is the student id part of the composite identifier.
     */
    private Long id;

    /**
     * This is the homework name part of the composite identifier.
     */
    private String homeworkName;

    /**
     * No-arg constructor.
     */
    public StudentHomeworkId() {
    }

    /**
     * All-arg constructor.
     */
    public StudentHomeworkId(Long id, String homeworkName) {
        this.id = id;
        this.homeworkName = homeworkName;
    }

    /**
     * Returns the student id.
     */
    public Long getId() {
        return id;
    }

    /**
     * Returns the homework name.
     */
    public String getHomeworkName() {
        return homeworkName;
    }

    /**
     * Overrides the equals method to check equality of StudentHomeworkId objects based on id and homeworkName.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof StudentHomeworkId)) return false;
        StudentHomeworkId that = (StudentHomeworkId) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(homeworkName, that.homeworkName);
    }

    /**
     * Overrides the hashCode method to compute the hash based on id and homeworkName.
     */
    @Override
    public int hashCode() {
        return Objects.hash(id, homeworkName);
    }
}
