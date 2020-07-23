package com.emt.courses.repository;

import com.emt.courses.model.CourseVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CourseVideoRepository extends JpaRepository<CourseVideo,Integer> {

    @Transactional
    List<CourseVideo> getAllByCourseId(int courseId);
}