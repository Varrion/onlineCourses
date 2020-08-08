package com.emt.courses.service.implementation;

import com.emt.courses.model.Course;
import com.emt.courses.model.CourseCategory;
import com.emt.courses.model.Customer;
import com.emt.courses.model.dto.CourseDto;
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
    public List<Course> getAllOwnedCoursesForCustomer(Customer customer) {
        return courseRepository.findAllByCustomersIs(customer);
    }

    @Override
    public List<Course> getAllCoursesByCategory(int categoryId) {
        return courseRepository.getAllByCategoryId(categoryId);
    }

    @Override
    public List<Course> getAllFreeCourses(boolean isFree) {
        return courseRepository.getAllByIsFree(isFree);
    }

    @Override
    public List<Course> getAllCoursesInShoppingCart(int shoppingCartId) {
        return courseRepository.getAllByShoppingCartId(shoppingCartId);
    }

    @Override
    public Optional<Course> getCourse(int courseId) {
        return courseRepository.findById(courseId);
    }

    @Override
    public Optional<Course> getCourseByCustomerShoppingCartAndId(int customerId, int courseId) {
        return courseRepository.getCourseByCustomerShoppingCartAndId(customerId, courseId);
    }

    @Override
    public Course saveCourse(CourseDto courseDto, CourseCategory category, Customer customer) {
        Course course = new Course(courseDto.id,
                courseDto.name,
                courseDto.description,
                courseDto.price,
                courseDto.isFree);

        course.setCategory(category);
        course.setInstructor(customer);
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
            return courseRepository.save(updateCourse);
        }
        return null;
    }

    @Override
    public void deleteCourse(int courseId) {
        courseRepository.deleteById(courseId);
    }
}
