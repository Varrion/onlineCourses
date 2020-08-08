package com.emt.courses.controller;

import com.emt.courses.model.*;
import com.emt.courses.model.dto.CourseDto;
import com.emt.courses.model.dto.CourseRatingDto;
import com.emt.courses.service.*;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/courses")
public class CourseController {

    private final CourseService courseService;
    private final CourseVideoService courseVideoService;
    private final CourseRatingService courseRatingService;
    private final CustomerService customerService;

    public CourseController(CourseService courseService,
                            CourseVideoService courseVideoService,
                            CourseRatingService courseRatingService,
                            CustomerService customerService) {
        this.courseService = courseService;
        this.courseVideoService = courseVideoService;
        this.courseRatingService = courseRatingService;
        this.customerService = customerService;
    }

    @GetMapping
    List<Course> getAllCourses(@RequestParam(required = false) Optional<Boolean> isFree) {

        if (isFree.isPresent()) {
            return courseService.getAllFreeCourses(isFree.get());
        }

        return courseService.getAllCourses();
    }

    @GetMapping("/instructor/{instructorId}")
    List<Course> getAllCoursesByInstructor(@PathVariable Integer instructorId) {
        return courseService.getAllCoursesByInstructor(instructorId);
    }

    @GetMapping("/{id}")
    Optional<Course> getCourseDetails(@PathVariable Integer id) {
        return courseService.getCourse(id);
    }

    @DeleteMapping("/{id}")
    void deleteCourse(@PathVariable Integer id) {
        courseService.deleteCourse(id);
    }

    @PostMapping
    Course saveCourse(@RequestBody CourseDto courseDto) {
        Optional<Customer> optionalCustomer = customerService.getCustomer(courseDto.instructorId);
        if (optionalCustomer.isPresent()) {
            Customer instructor = optionalCustomer.get();
            return courseService.saveCourse(courseDto, instructor);
        }

        return null;
    }

    @PutMapping
    Course updateCourse(@RequestBody CourseDto courseDto) {
        return courseService.updateCourse(courseDto);
    }


    @GetMapping("category/{categoryId}")
    List<Course> getAllCoursesByCategory(@PathVariable Integer categoryId) {
        return courseService.getAllCoursesByCategory(categoryId);
    }

    //videos
    @GetMapping("{courseId}/videos")
    List<CourseVideo> getAllVideosForCourse(@PathVariable Integer courseId) {
        return courseVideoService.getAllVideosByCourse(courseId);
    }

    @PostMapping("{courseId}/videos")
    CourseVideo addCourseVideo(@PathVariable Integer courseId,
                               @RequestParam("video") MultipartFile video,
                               @RequestParam("title") String title) throws FileUploadException {
        return courseVideoService.saveCourseVideo(video, title, courseId);
    }

    @PutMapping("{courseId}/videos")
    CourseVideo updateCourseVideo(@PathVariable Integer courseId, @RequestBody CourseVideo courseVideo) {
        return courseVideoService.updateCourseVideo(courseVideo);
    }

    @GetMapping("{courseId}/videos/{videoId}")
    Optional<CourseVideo> getCourseVideo(@PathVariable Integer courseId, @PathVariable Integer videoId) {
        return courseVideoService.getCourseVideo(videoId);
    }

    @DeleteMapping("{courseId}/videos/{videoId}")
    void deleteCourseVideo(@PathVariable Integer courseId, @PathVariable Integer videoId) {
        courseVideoService.deleteCourseVideo(videoId);
    }

    //ratings
    @GetMapping("{courseId}/ratings")
    List<CourseRating> getAllCourseRatings(@PathVariable Integer courseId) {
        return courseRatingService.getAllCourseRatings(courseId);
    }

    @PostMapping("{courseId}/ratings")
    CourseRating postCourseRating(@PathVariable Integer courseId, @RequestBody CourseRatingDto courseRating) {
        Optional<Customer> optionalCustomer = customerService.getCustomer(courseRating.getCustomerId());
        if (optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();
            return courseRatingService.saveRating(courseRating, customer, courseId);
        }
        return null;
    }

    @PutMapping("{courseId}/ratings")
    CourseRating updateCourseRating(@PathVariable Integer courseId, @RequestBody CourseRatingDto courseRatingDto) {
        return courseRatingService.updateRating(courseRatingDto);
    }

    @DeleteMapping("{courseId}/ratings/{ratingId}")
    void deleteCourseRating(@PathVariable Integer courseId, @PathVariable Integer ratingId) {
        courseRatingService.deleteRating(ratingId);
    }

    @GetMapping("{courseId}/ratings/{ratingId}")
    Optional<CourseRating> getCourseRating(@PathVariable Integer courseId, @PathVariable Integer ratingId) {
        return courseRatingService.getCourseRating(ratingId);
    }

    //ShoppingCart
    @GetMapping("cart/{customerId}")
    List<Course> getCoursesInShoppingCart(@PathVariable Integer customerId) {
        return courseService.getAllCoursesInShoppingCart(customerId);
    }

    @GetMapping("{courseId}/cart/{customerId}")
    Optional<Course> getCourseByIdAndCustomerShoppingCart(@PathVariable Integer customerId, @PathVariable Integer courseId) {
        return courseService.getCourseByCustomerShoppingCartAndId(customerId, courseId);
    }
}
