package com.emt.courses.service;

import com.emt.courses.model.CourseRating;

import java.util.List;

public interface CourseRatingService {

    List<CourseRating> getAllCourseRatings(int courseId);

    CourseRating getCourseRating(int ratingId);

    CourseRating updateRating (CourseRating courseRating);

    CourseRating saveRating (CourseRating courseRating);

    void deleteRating(int ratingId);
}
