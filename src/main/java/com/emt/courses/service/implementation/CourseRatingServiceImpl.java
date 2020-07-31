package com.emt.courses.service.implementation;

import com.emt.courses.model.Course;
import com.emt.courses.model.CourseRating;
import com.emt.courses.model.dto.CourseRatingDto;
import com.emt.courses.model.enums.Rating;
import com.emt.courses.repository.CourseRatingRepository;
import com.emt.courses.service.CourseRatingService;
import com.emt.courses.service.CourseService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseRatingServiceImpl implements CourseRatingService {

    private final CourseRatingRepository ratingRepository;
    private final CourseService courseService;

    public CourseRatingServiceImpl(CourseRatingRepository ratingRepository, CourseService courseService) {
        this.ratingRepository = ratingRepository;
        this.courseService = courseService;
    }

    @Override
    public List<CourseRating> getAllCourseRatings(int courseId) {
        return ratingRepository.getAllByCourseId(courseId);
    }

    @Override
    public Optional<CourseRating> getCourseRating(int ratingId) {
        return ratingRepository.findById(ratingId);
    }

    @Override
    public CourseRating updateRating(CourseRatingDto courseRatingDto) {
        Optional<CourseRating> optionalCourseRating = getCourseRating(courseRatingDto.getId());

        if (optionalCourseRating.isPresent()) {
            CourseRating courseRating = optionalCourseRating.get();
            Rating rating = Rating.fromInteger(courseRatingDto.getRating());
            courseRating.setRating(rating);
            courseRating.setComment(courseRating.getComment());
            return ratingRepository.save(courseRating);
        }
        return null;
    }

    @Override
    public CourseRating saveRating(CourseRatingDto courseRating, Integer courseId) {

        Optional<Course> optionalCourse = courseService.getCourse(courseId);

        if (optionalCourse.isPresent()) {
            Course course = optionalCourse.get();
            Rating ratingEnum = Rating.fromInteger(courseRating.getRating());

            CourseRating rating = new CourseRating(ratingEnum, courseRating.getComment(), course);
            return ratingRepository.save(rating);
        }
        return null;
    }

    @Override
    public void deleteRating(int ratingId) {
        ratingRepository.deleteById(ratingId);
    }
}
