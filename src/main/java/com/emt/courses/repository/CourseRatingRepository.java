package com.emt.courses.repository;

import com.emt.courses.model.CourseRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CourseRatingRepository extends JpaRepository<CourseRating,Integer> {

    @Transactional
    List<CourseRating> getAllByCourseId(int courseId);
}
