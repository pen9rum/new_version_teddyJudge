package com.Teddy.backend.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentContestBoxBO {
    private String contestname;
    private long id;
    private boolean totalscore;
    private List<Double> questionscore;
}
