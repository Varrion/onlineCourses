package com.emt.courses.service.implementation;

import com.emt.courses.model.Course;
import com.emt.courses.model.CourseRating;
import com.emt.courses.repository.CourseRatingRepository;
import com.emt.courses.service.CourseRatingService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public Optional<CourseRating> getCourseRating(int ratingId) {
        return ratingRepository.findById(ratingId);
    }

    @Override
    public CourseRating updateRating(CourseRating courseRating) {

        Optional<CourseRating> optionalCourseRating = getCourseRating(courseRating.getId());

        if (optionalCourseRating.isPresent()) {
            CourseRating rating = optionalCourseRating.get();
            rating.setRating(courseRating.getRating());
            return ratingRepository.save(rating);
        }

        return null;
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
