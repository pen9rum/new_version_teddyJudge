package com.Teddy.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * This class represents the request for executing code.
 *
 * The class uses Lombok annotations for boilerplate code reduction:
 * - @Data generates getters for all fields, a useful toString method,
 *   and hashCode and equals implementations that check all non-transient fields.
 * - @NoArgsConstructor creates a constructor with no parameters.
 * - @AllArgsConstructor generates a constructor with a parameter for each field in your class.
 *
 * Fields are the 'id', 'homeworkName', and 'sourceCode' of the ExecuteCodeRequest.
 *
 * @author Your Name
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExecuteCodeRequest {

    /**
     * The ID of the student who sent the request.
     */
    private Long id;

    /**
     * The name of the homework the code belongs to.
     */
    private String homeworkName;

    /**
     * The source code to be executed.
     */
    private String sourceCode;
}
