package com.Teddy.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * This class is a Data Transfer Object (DTO) for StyleCheckResult.
 * A DTO is an object that carries data between processes, in this case,
 * from the server to the client. The data contained in this DTO is
 * intended for read-only purposes.
 *
 * The class uses Lombok annotations for boilerplate code reduction:
 * - @Data generates getters for all fields, a useful toString method,
 *   and hashCode and equals implementations that check all non-transient fields.
 * - @NoArgsConstructor creates a constructor with no parameters.
 * - @AllArgsConstructor generates a constructor with a parameter for each field in your class.
 *
 * Fields are the 'homeworkName' and 'studentId' of the StyleCheckResult.
 *
 * @author Your Name
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StyleCheckResultDTO{
    /**
     * The name of the homework associated with the StyleCheckResult.
     */
    private String homeworkName;

    /**
     * The ID of the student associated with the StyleCheckResult.
     */
    private Long studentId;

}
