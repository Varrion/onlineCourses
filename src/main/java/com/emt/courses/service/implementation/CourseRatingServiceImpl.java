package com.emt.courses.service.implementation;

import com.emt.courses.model.Course;
import com.emt.courses.model.CourseRating;
import com.emt.courses.repository.CourseRatingRepository;
import com.emt.courses.service.CourseRatingService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseRatingServiceImpl implements CourseRatingService {

    private final CourseRatingRepository ratingRepository;

    public CourseRatingServiceImpl(CourseRatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    @Override
    public List<CourseRating> getAllCourseRatings(int courseId) {
        return ratingRepository.getAllByCourseId(courseId);
    }

    @Override
    public CourseRating getCourseRating(int ratingId) {
        return ratingRepository.getOne(ratingId);
    }

    @Override
    public CourseRating updateRating(CourseRating courseRating) {
        CourseRating rating = getCourseRating(courseRating.getId());
        rating.setRating(courseRating.getRating());
        return ratingRepository.save(rating);
    }

    @Override
    public CourseRating saveRating(CourseRating courseRating) {
        return ratingRepository.save(courseRating);
    }

    @Override
    public void deleteRating(int ratingId) {
        ratingRepository.deleteById(ratingId);
    }
}
