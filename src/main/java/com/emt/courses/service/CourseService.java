package com.emt.courses.service;

import com.emt.courses.model.Course;

import java.util.List;
import java.util.Optional;

public interface CourseService {

    List<Course> getAllCourses();

    List<Course> getAllCoursesByInstructor(int instructorId);

    List<Course> getAllCoursesByCategory(int categoryId);

    List<Course> getAllFreeCourses(boolean isFree);

    Optional<Course> getCourse(int courseId);

    Course saveCourse(Course course);

    Course updateCourse(Course course);

    void deleteCourse(int courseId);
}
