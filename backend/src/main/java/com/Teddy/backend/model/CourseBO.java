package com.Teddy.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * This class represents a Business Object (BO) for Course.
 * A Business Object represents a value or an object in the business domain,
 * including a full set of methods to manipulate its encapsulated data.
 *
 * The class uses Lombok annotations for boilerplate code reduction:
 * - @Data generates getters for all fields, a useful toString method,
 *   and hashCode and equals implementations that check all non-transient fields.
 * - @NoArgsConstructor creates a constructor with no parameters.
 * - @AllArgsConstructor generates a constructor with a parameter for each field in your class.
 *
 * Fields are the 'coursename', 'PDF', and 'pdfUrl' of the Course.
 *
 * @author Your Name
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseBO {

    /**
     * The name of the course.
     */
    private String coursename;

    /**
     * The PDF associated with the course, represented as a byte array.
     */
    private byte[] PDF;

    /**
     * The URL of the PDF associated with the course.
     */
    private String pdfUrl;
}
