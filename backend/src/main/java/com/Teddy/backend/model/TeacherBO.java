package com.Teddy.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherBO { //這是跟業務邏輯有關，不是直接連資料庫，用來寫判斷是

    private String id;

    private String name;
    private String password;
    private String color;
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("id:" + id + ",");
        sb.append("password:" + password );
        sb.append("color:" + color );
        return sb.toString();
    }
}