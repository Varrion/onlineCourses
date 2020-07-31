package com.emt.courses.service;

import com.emt.courses.model.CourseRating;
import com.emt.courses.model.dto.CourseRatingDto;

import java.util.List;
import java.util.Optional;

public interface CourseRatingService {

    List<CourseRating> getAllCourseRatings(int courseId);

    Optional<CourseRating> getCourseRating(int ratingId);

    CourseRating updateRating (CourseRatingDto courseRatingDto);

    CourseRating saveRating(CourseRatingDto courseRating, Integer courseId);

    void deleteRating(int ratingId);
}
