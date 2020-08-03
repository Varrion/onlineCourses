package com.emt.courses.controller;

import com.emt.courses.model.Course;
import com.emt.courses.model.CourseRating;
import com.emt.courses.model.CourseVideo;
import com.emt.courses.model.dto.CourseRatingDto;
import com.emt.courses.service.CourseRatingService;
import com.emt.courses.service.CourseService;
import com.emt.courses.service.CourseVideoService;
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

    public CourseController(CourseService courseService, CourseVideoService courseVideoService, CourseRatingService courseRatingService) {
        this.courseService = courseService;
        this.courseVideoService = courseVideoService;
        this.courseRatingService = courseRatingService;
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
    Course saveCategory(@RequestBody Course course) {
        return courseService.saveCourse(course);
    }

    @PutMapping
    Course updateCategory(@RequestBody Course course) {
        return courseService.updateCourse(course);
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
        return courseRatingService.saveRating(courseRating, courseId);
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
}
