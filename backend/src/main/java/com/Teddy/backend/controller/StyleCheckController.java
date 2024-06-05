package com.Teddy.backend.controller;

import com.Teddy.backend.model.StyleCheckBO;
import com.Teddy.backend.dto.StyleCheckResultDTO;
import com.Teddy.backend.service.StyleCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")  // Replace with your frontend origin
@RestController
@RequestMapping("/style-check")
public class StyleCheckController {

    @Autowired
    private StyleCheckService styleCheckService;

    @PostMapping("/add")
    public ResponseEntity<Void> addStyleCheck(@RequestBody StyleCheckBO styleCheckBO) {
        try {
            styleCheckService.addStyleCheck(styleCheckBO);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/result")
    public ResponseEntity<List<String>> getStyleCheckResult(@RequestBody StyleCheckResultDTO styleCheckResultDTO){
        try{
            List<String> result = styleCheckService.getStyleCheck(styleCheckResultDTO.getStudentId(), styleCheckResultDTO.getHomeworkName());
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(RuntimeException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
