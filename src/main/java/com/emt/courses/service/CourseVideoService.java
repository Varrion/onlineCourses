package com.emt.courses.service;

import com.emt.courses.model.CourseVideo;

import java.util.List;
import java.util.Optional;

public interface CourseVideoService {

    List<CourseVideo> getAllVideosByCourse(int courseId);

    Optional<CourseVideo> getCourseVideo(int videoId);

    CourseVideo saveCourseVideo(CourseVideo courseVideo);

    CourseVideo updateCourseVideo(CourseVideo courseVideo);

    void deleteCourseVideo(int videoId);
}
