package com.emt.courses.service.implementation;

import com.emt.courses.model.Course;
import com.emt.courses.repository.CourseRepository;
import com.emt.courses.service.CourseService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        return courseRepository.getAllByInstructorId(instructorId);
    }

    @Override
    public List<Course> getAllCoursesByCategory(int categoryId) {
        return courseRepository.getAllByCategoryId(categoryId);
    }

    @Override
    public Optional<Course> getCourse(int courseId) {
        return courseRepository.findById(courseId);
    }

    @Override
    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Course updateCourse(Course course) {
        Optional<Course> optionalCourse = getCourse(course.getId());

        if (optionalCourse.isPresent()) {
            Course updateCourse = optionalCourse.get();
            updateCourse.setCategory(course.getCategory());
            updateCourse.setDescription(course.getDescription());
            updateCourse.setName(course.getName());
            updateCourse.setIsFree(course.getIsFree());
            updateCourse.setPrice(course.getPrice());
            return saveCourse(updateCourse);
        }

        return null;
    }

    @Override
    public void deleteCourse(int courseId) {
        courseRepository.deleteById(courseId);
    }
}
