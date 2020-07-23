package com.emt.courses.repository;

import com.emt.courses.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {

    @Transactional
    List<Course> getAllByInstructor(int instructorId);
}
