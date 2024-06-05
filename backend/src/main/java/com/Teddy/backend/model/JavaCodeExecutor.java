package com.Teddy.backend.model;
import com.Teddy.backend.entity.TestCase;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.BufferedWriter;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
public class JavaCodeExecutor {

    private static final String PROJECT_PATH = System.getProperty("user.dir");
    private static final String MAIN_JAVA_FILE_PATH = Paths.get(PROJECT_PATH, "src", "main", "resources", "Main.java").toString();
    private static final String MAIN_CLASS_FILE_PATH = Paths.get(PROJECT_PATH, "src", "main", "resources", "Main.class").toString();

    public String compileAndRunJavaCode(String sourceCode, Long id, List<TestCase> testCases, List<Double> results) {
        try {
            Files.write(Paths.get(MAIN_JAVA_FILE_PATH), sourceCode.getBytes());

            ProcessBuilder compileProcessBuilder = new ProcessBuilder("javac", MAIN_JAVA_FILE_PATH);
            Process compileProcess = compileProcessBuilder.start();
            int compileExitCode = compileProcess.waitFor();

            if (compileExitCode != 0) {
                return "編譯錯誤：" + new String(compileProcess.getErrorStream().readAllBytes());
            }

            double totalScore = 0;
            double scorePerCase = 100.0 / testCases.size();
            StringBuilder resultOutput = new StringBuilder();

            int testCaseNumber = 1;
            for (TestCase testCase : testCases) {
                String input = testCase.getTestCase();
                String expectedOutput = testCase.getTestCaseAnswer();

                ProcessBuilder runProcessBuilder = new ProcessBuilder("java", "-cp", Paths.get(PROJECT_PATH, "src", "main", "resources").toString(), "Main");
                Process runProcess = runProcessBuilder.start();

                try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(runProcess.getOutputStream(), StandardCharsets.UTF_8))) {
                    writer.write(input + "\n");
                    writer.flush();
                }

                int runExitCode = runProcess.waitFor();

                if (runExitCode == 0) {
                    String actualOutput = new String(runProcess.getInputStream().readAllBytes()).trim();

                    System.out.println("UserOutput");
                    System.out.println(actualOutput);

                    System.out.println("Answer");
                    System.out.println(expectedOutput);

                    if (actualOutput.equals(expectedOutput)) {
                        totalScore += scorePerCase;
                        results.add(scorePerCase);
                        resultOutput.append("Test case ").append(testCaseNumber).append(", AC\n");
                    } else {
                        resultOutput.append("Test case ").append(testCaseNumber).append(", WA\n");
                    }
                } else {
                    return "運行時錯誤：" + new String(runProcess.getErrorStream().readAllBytes());
                }
                testCaseNumber++;
            }

            resultOutput.append("最終得分：").append(String.format("%.2f", totalScore));
            return resultOutput.toString();

        } catch (IOException | InterruptedException e) {
            return "錯誤：" + e.getMessage();
        } finally {
            new File(MAIN_JAVA_FILE_PATH).delete();
            new File(MAIN_CLASS_FILE_PATH).delete();
        }
    }
}
