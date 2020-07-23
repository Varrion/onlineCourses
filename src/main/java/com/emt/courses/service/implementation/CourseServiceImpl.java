package com.emt.courses.service.implementation;

import com.emt.courses.model.Course;
import com.emt.courses.repository.CourseRepository;
import com.emt.courses.service.CourseService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public List<Course> getAllCoursesByInstructor(int instructorId) {
        return courseRepository.getAllByInstructor(instructorId);
    }

    @Override
    public Course getCourse(int courseId) {
        return courseRepository.getOne(courseId);
    }

    @Override
    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Course updateCourse(Course course) {
        Course updateCourse = getCourse(course.getId());

        updateCourse.setCategory(course.getCategory());
        updateCourse.setDescription(course.getDescription());
        updateCourse.setName(course.getName());
        updateCourse.setIsFree(course.getIsFree());
        updateCourse.setPrice(course.getPrice());

        return saveCourse(updateCourse);
    }

    @Override
    public void deleteCourse(int courseId) {
        courseRepository.deleteById(courseId);
    }
}
