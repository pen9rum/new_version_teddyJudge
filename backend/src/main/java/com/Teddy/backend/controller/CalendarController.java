package com.Teddy.backend.controller;

import com.Teddy.backend.model.CalendarBo;
import com.Teddy.backend.model.ExecuteCodeRequest;
import com.Teddy.backend.model.LeaderBoardHomeworkBO;
import com.Teddy.backend.service.CalendarService;
import com.Teddy.backend.service.CodeExecutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")  // Replace with your frontend origin
@RestController
@RequestMapping("/calendar")
public class CalendarController {

    @Autowired
    private CalendarService calendarService;

    @GetMapping("/getCalendar")
    public ResponseEntity<List<CalendarBo>> getCalendar() {
        return ResponseEntity.ok(calendarService.getCalendar());
    }
}
