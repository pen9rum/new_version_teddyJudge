package com.Teddy.backend.dao;

import com.Teddy.backend.entity.Contest;
import com.Teddy.backend.entity.StudentHomeworkBox;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

/**
 * Author: Your Name
 *
 * This interface represents the Data Access Object (DAO) for the StudentHomeworkBox entity.
 * It extends Spring's CrudRepository interface to inherit basic CRUD operations.
 *
 * It includes two query methods to find StudentHomeworkBoxes by homework name and by both the homework name and id.
 *
 * @author Your Name
 */
public interface StudentHomeworkBoxDao extends CrudRepository<StudentHomeworkBox, Long> {

    /**
     * This method finds a list of StudentHomeworkBoxes by their homework name.
     *
     * @param homeworkName the name of the homework to find StudentHomeworkBoxes for
     * @return a list of StudentHomeworkBoxes with the given homework name
     */
    List<StudentHomeworkBox> findByHomeworkName(String homeworkName);

    /**
     * This method finds a StudentHomeworkBox by its homework name and id.
     * It returns an Optional that will contain the StudentHomeworkBox if it exists, or be empty if it does not.
     *
     * @param homeworkName the name of the homework to find the StudentHomeworkBox for
     * @param id the id of the StudentHomeworkBox to find
     * @return an Optional containing the found StudentHomeworkBox or empty if not found
     */
    Optional<StudentHomeworkBox> findByHomeworkNameAndId(String homeworkName, Long id);
}
