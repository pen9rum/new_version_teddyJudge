package com.Teddy.backend.model;

import java.util.List;
import java.util.ArrayList;
import org.springframework.stereotype.Component;
import java.util.regex.Pattern;

@Component
public class StyleCheckExecutor {

    public static List<String> checkStyle(String sourceCode, List<String> functionName, List<String> functionType){
        List<String> result = new ArrayList<>();
        String[] lines = sourceCode.split("\n");

        // Check if all lists have the same size
        if (functionName.size() != functionType.size() ) {
            throw new IllegalArgumentException("Function names and types lists must have the same size");
        }

        // Check each function name and type
        for (int i = 0; i < functionName.size(); i++) {
            String name = functionName.get(i);
            String type = functionType.get(i);

            // Build a regular expression to match the function in the source code
            String escapedType = type.replace("[", "\\[").replace("]", "\\]");
            String regex = escapedType + "\\s+" + name + "\\s*\\(";

            Pattern pattern = Pattern.compile(regex);
            boolean found = false;

            // Check each line of the source code
            for (String line : lines) {
                if (pattern.matcher(line).find()) {
                    found = true;
                    break;
                }
            }

            // If the function was not found in the source code, add it to the result list
            if (!found) {
                result.add("Not Found Function " + type + " " + name);
            }else{
                result.add("Pass "+ type + " " + name);
            }
        }

        return result;
    }
}
