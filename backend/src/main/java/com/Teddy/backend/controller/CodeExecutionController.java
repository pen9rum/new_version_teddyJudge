package com.Teddy.backend.controller;

import com.Teddy.backend.model.ExecuteCodeRequest;
import com.Teddy.backend.service.CodeExecutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")  // Replace with your frontend origin
@RestController
@RequestMapping("/code")
public class CodeExecutionController {
    @Autowired
    private CodeExecutionService codeExecutionService;

    @PostMapping("/execute")
    public String executeCode(@RequestBody ExecuteCodeRequest request) {
        System.out.println("Submit code");
        System.out.println(request.getId());
        System.out.println(request.getHomeworkName());
        System.out.println(request.getSourceCode());
        return codeExecutionService.compileAndRunJavaCode(request);
    }


}
