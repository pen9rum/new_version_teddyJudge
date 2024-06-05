package com.Teddy.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StyleCheckBO{
    private String homeworkName;
    private List<String> functionName;
    private List<String> functionType;
}


