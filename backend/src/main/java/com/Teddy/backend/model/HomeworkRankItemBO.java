package com.Teddy.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HomeworkRankItemBO {
    private Long id;
    private int rank;
    private Long sId;
    private Double score;
}
