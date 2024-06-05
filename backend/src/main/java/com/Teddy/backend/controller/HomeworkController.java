package com.Teddy.backend.controller;

import com.Teddy.backend.model.HomeworkBO;
import com.Teddy.backend.service.HomeworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.List;
import java.util.Date;




@CrossOrigin(origins = "http://localhost:3000")  // Replace with your frontend origin
@RestController
@RequestMapping("/homework")
public class HomeworkController {
    @Autowired
    private HomeworkService homeworkService;

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> addHomework(
            @RequestPart("pdfFile") MultipartFile pdfFile,
            @RequestPart("homework") String homeworkJSON) {

        System.out.println("Add Homework");
        System.out.println(homeworkJSON);

        ObjectMapper objectMapper = new ObjectMapper();
        HomeworkBO homeworkBo;
        try {
            homeworkBo = objectMapper.readValue(homeworkJSON, HomeworkBO.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {
            byte[] pdfBytes = pdfFile.getBytes();
            homeworkBo.setPDF(pdfBytes);

            if (homeworkService.add(homeworkBo) == false) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<HomeworkBO>> getAllHomework() {
        return new ResponseEntity<>(homeworkService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{homeworkName}/pdf")
    public ResponseEntity<byte[]> getHomeworkPdf(@PathVariable String homeworkName) {

        byte[] pdfBytes = homeworkService.getPdf(homeworkName);
        if (pdfBytes == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "homework.pdf");
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        }
    }

    @GetMapping("/{homeworkName}")
    public ResponseEntity<HomeworkBO> getHomeworkByHomeworkName(@PathVariable String homeworkName) {
        HomeworkBO homeworkBo = homeworkService.getHomeworkByHomeworkName(homeworkName);
        if (homeworkBo == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(homeworkBo, HttpStatus.OK);
    }


    @PutMapping("/{homeworkName}/update/starttime")
    public ResponseEntity<Void> updateStartTime( @RequestParam("dateParam") @DateTimeFormat(pattern="yyyy-MM-dd") Date StartTime,@PathVariable String homeworkName) {

        Boolean date = homeworkService.updateStartTime(StartTime,homeworkName);
        if (date == false) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else
        {
            return new ResponseEntity<>( HttpStatus.OK);
        }
    }

    @PutMapping("/{homeworkName}/update/endtime")
    public ResponseEntity<Void> updateEndTime( @RequestParam("dateParam") @DateTimeFormat(pattern="yyyy-MM-dd") Date EndTime,@PathVariable String homeworkName) {
        Boolean date = homeworkService.updateEndTime(EndTime,homeworkName);
        if (date == false) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else
        {
            return new ResponseEntity<>( HttpStatus.OK);
        }
    }

    @PutMapping("/{homeworkName}/update/testcaseanswer/{testCaseIndex}")
    public ResponseEntity<Void> updateTestCaseAnswer(@PathVariable String homeworkName, @PathVariable int testCaseIndex, @RequestBody String testCaseAnswer) {
        Boolean testCaseAnswer1 = homeworkService.updateTestCaseAnswer(homeworkName, testCaseIndex, testCaseAnswer);
        if (testCaseAnswer1  == false) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }


    @PutMapping("/{homeworkName}/update/testcase/{testCaseIndex}")
    public ResponseEntity<Void> updateTestCase(@PathVariable String homeworkName, @PathVariable int testCaseIndex, @RequestBody String testCase) {
        Boolean testCase1= homeworkService.updateTestCase(homeworkName, testCaseIndex, testCase);
        if (testCase1 == false) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
    @PutMapping(value = "/{homeworkName}/update/pdf", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> updateHomeworkPdf(@RequestPart("pdfFile") MultipartFile newPdfFile, @PathVariable String homeworkName) {
        try {
            byte[] newPdfBytes = newPdfFile.getBytes();

            if (homeworkService.updatePdf( homeworkName,newPdfBytes)) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





}