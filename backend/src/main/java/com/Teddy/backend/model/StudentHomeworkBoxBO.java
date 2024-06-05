package com.Teddy.backend.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentHomeworkBoxBO {
    private String homeworkName;
    private long id;
    private List<Double> score;

    private String sourceCode;
    private String result;
}
