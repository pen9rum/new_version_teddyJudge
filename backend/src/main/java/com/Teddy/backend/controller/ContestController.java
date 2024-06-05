package com.Teddy.backend.controller;

import com.Teddy.backend.model. ContestBO;
import com.Teddy.backend.model.HomeworkBO;
import com.Teddy.backend.service. ContestService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")  // Replace with your frontend origin
@RestController
@RequestMapping("/contest")
public class ContestController {

    @Autowired
    private ContestService contestService;

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> addContest(
            @RequestPart("pdfFiles") MultipartFile[] pdfFiles,
            @RequestPart("contest") String contestJSON) {


        ObjectMapper objectMapper = new ObjectMapper();
        ContestBO contestBo;
        try {
            contestBo = objectMapper.readValue(contestJSON, ContestBO.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {
            List<HomeworkBO> homeworks = new ArrayList<>();
            for (int i = 0; i < pdfFiles.length; i++) {
                byte[] pdfBytes = pdfFiles[i].getBytes();
                HomeworkBO homeworkBo = contestBo.getHomeworks().get(i);
                homeworkBo.setPDF(pdfBytes);
                homeworks.add(homeworkBo);
            }
            contestBo.setHomeworks(homeworks);

            if (contestService.add(contestBo) == false) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<ContestBO>> getAllContest() {
        return new ResponseEntity<>(contestService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/getByName/{name}")
    public ResponseEntity<ContestBO> getContestByName(@PathVariable("name") String name) {
        ContestBO contestBo = contestService.findByContestName(name);
        if(contestBo == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(contestBo, HttpStatus.OK);
    }


    @PutMapping("/{contestName}/update/starttime")
    public ResponseEntity<Void> updateStartTime(@RequestParam("dateParam") @DateTimeFormat(pattern="yyyy-MM-dd") Date StartTime, @PathVariable String contestName) {
        System.out.println("Hello contest");
        Boolean date = contestService.updateStartTime(StartTime,contestName);
        if (date == false) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else
        {
            return new ResponseEntity<>( HttpStatus.OK);
        }
    }

    @PutMapping("/{contestName}/update/endtime")
    public ResponseEntity<Void> updateEndTime( @RequestParam("dateParam") @DateTimeFormat(pattern="yyyy-MM-dd") Date EndTime,@PathVariable String contestName) {
        Boolean date = contestService.updateEndTime(EndTime,contestName);
        if (date == false) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else
        {
            return new ResponseEntity<>( HttpStatus.OK);
        }
    }




}
