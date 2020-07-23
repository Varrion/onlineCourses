package com.emt.courses.service;

import com.emt.courses.model.CourseVideo;

import java.util.List;

public interface CourseVideoService {

    List<CourseVideo> getAllVideosByCourse(int courseId);

    CourseVideo getCourseVideo(int videoId);

    CourseVideo saveCourseVideo(CourseVideo courseVideo);

    CourseVideo updateCourseVideo(CourseVideo courseVideo);

    void deleteCourseVideo(int videoId);
}
