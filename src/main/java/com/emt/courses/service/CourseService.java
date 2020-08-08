package com.emt.courses.service;

import com.emt.courses.model.Course;
import com.emt.courses.model.Customer;
import com.emt.courses.model.dto.CourseDto;

import java.util.List;
import java.util.Optional;

public interface CourseService {

    List<Course> getAllCourses();

    List<Course> getAllCoursesByInstructor(int instructorId);

    List<Course> getAllOwnedCoursesForCustomer(Customer customer);

    List<Course> getAllCoursesByCategory(int categoryId);

    List<Course> getAllFreeCourses(boolean isFree);

    List<Course> getAllCoursesInShoppingCart(int shoppingCartId);

    Optional<Course> getCourse(int courseId);

    Optional<Course> getCourseByCustomerShoppingCartAndId(int customerId, int courseId);

    Course saveCourse(CourseDto courseDto, Customer customer);

    Course updateCourse(CourseDto courseDto);

    void deleteCourse(int courseId);
}
