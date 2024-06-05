package com.Teddy.backend.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StyleCheckResultBO{
    private String homeworkName;
    private Long studentId;
    private List<String> results;
}


