package com.Teddy.backend.model;
import org.springframework.stereotype.Component;

@Component
public class ValidContributor {
    public boolean isTeacherPasswordAvailable(String password, String confirm_password) {
        if (password.equals(confirm_password)) {
            return true;
        }
        return false;
    }

    public boolean isStudentPasswordAvailable(String password, String confirm_password) {
        if (password.equals(confirm_password)) {
            return true;
        }
        return false;
    }

    public boolean isStudentValidId(long id) {
        //Student student =new Student();
        // available for 110~119 students
        int length = 0;
        long arrayname[] = new long[9];
        while (id != 0L) {
            length++;
            arrayname[length - 1] = id % 10;
            id /= 10;
        }
        if (length != 9) {
            return false;
        } else {
            if (arrayname[8] != 1 || arrayname[7] != 1 || arrayname[5] != 3 || arrayname[4] != 0 || arrayname[3] != 6) {
                return false;
            }
        }
        return true;
    }
}











