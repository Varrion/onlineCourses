package com.emt.courses.service;

import com.emt.courses.model.Course;

import java.util.List;

public interface CourseService {

    List<Course> getAllCourses();

    List<Course> getAllCoursesByInstructor(int instructorId);

    Course getCourse(int courseId);

    Course saveCourse(Course course);

    Course updateCourse(Course course);

    void deleteCourse(int courseId);
}
