package com.Teddy.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import jakarta.persistence.*;

/**
 * Author: Your Name
 *
 * This class represents the entity for a Course.
 * It contains fields for the course name and a PDF content related to the course.
 *
 * @author Your Name
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    /**
     * This is the unique identifier for the Course entity.
     */
    @Id
    private String coursename;

    /**
     * This represents the PDF content associated with the course.
     * Stored as a large object (Lob) in the database.
     */
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] PDF;
}
