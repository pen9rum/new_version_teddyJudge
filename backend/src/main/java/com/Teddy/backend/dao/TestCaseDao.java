package com.Teddy.backend.dao;

import com.Teddy.backend.entity.TestCase;
import com.Teddy.backend.entity.Homework;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

/**
 * This interface represents the Data Access Object (DAO) for the TestCase entity.
 * It extends Spring's CrudRepository interface to inherit basic CRUD operations.
 *
 * It includes custom query methods to find a TestCase by its associated homework's name,
 * and test case index, or by its content and associated homework's name, and to check
 * if a TestCase exists for a specific Homework.
 *
 * @author Your Name
 */
@Repository
public interface TestCaseDao extends CrudRepository<TestCase, Long> {

    /**
     * This method finds a TestCase by its associated homework's name and test case index.
     *
     * @param homeworkName the name of the homework associated with the TestCase to find
     * @param testCaseIndex the index of the TestCase to find
     * @return an Optional containing the found TestCase or empty if not found
     */
    Optional<TestCase> findByHomeworkHomeworkNameAndTestCaseIndex(String homeworkName, int testCaseIndex);

    /**
     * This method retrieves all TestCases from the database.
     *
     * @return a List of all TestCases
     */
    List<TestCase> findAll();

    /**
     * This method finds all TestCases associated with a specific homework, identified by its name.
     *
     * @param homeworkName the name of the homework associated with the TestCases to find
     * @return a List of TestCases associated with the specified homework
     */
    List<TestCase> findByHomeworkHomeworkName(String homeworkName);

    /**
     * This method finds a TestCase by its content, its answer, and its associated homework's name.
     *
     * @param currentTestCase the content of the TestCase to find
     * @param currentTestCaseAnswer the answer of the TestCase to find
     * @param homeworkName the name of the homework associated with the TestCase to find
     * @return an Optional containing the found TestCase or empty if not found
     */
    Optional<TestCase> findByTestCaseAndTestCaseAnswerAndHomeworkHomeworkName(String currentTestCase, String currentTestCaseAnswer, String homeworkName);

    /**
     * This method checks if a TestCase exists for a specific Homework.
     *
     * @param homework the Homework to check for associated TestCases
     * @return true if at least one TestCase exists for the specified Homework, false otherwise
     */
    boolean existsByHomework(Homework homework);
}
