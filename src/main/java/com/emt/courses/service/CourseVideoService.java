package com.emt.courses.service;

import com.emt.courses.model.CourseVideo;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface CourseVideoService {

    List<CourseVideo> getAllVideosByCourse(int courseId);

    Optional<CourseVideo> getCourseVideo(int videoId);

    CourseVideo saveCourseVideo(MultipartFile file, String title, int courseId) throws FileUploadException;

    CourseVideo updateCourseVideo(CourseVideo courseVideo);

    void deleteCourseVideo(int videoId);
}
