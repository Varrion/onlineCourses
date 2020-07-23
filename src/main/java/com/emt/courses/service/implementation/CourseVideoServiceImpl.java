package com.emt.courses.service.implementation;

import com.emt.courses.model.CourseVideo;
import com.emt.courses.repository.CourseVideoRepository;
import com.emt.courses.service.CourseVideoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseVideoServiceImpl implements CourseVideoService {

    private final CourseVideoRepository videoRepository;

    public CourseVideoServiceImpl(CourseVideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    @Override
    public List<CourseVideo> getAllVideosByCourse(int courseId) {
        return videoRepository.getAllByCourseId(courseId);
    }

    @Override
    public CourseVideo getCourseVideo(int videoId) {
        return videoRepository.getOne(videoId);
    }

    @Override
    public CourseVideo saveCourseVideo(CourseVideo courseVideo) {
        return videoRepository.save(courseVideo);
    }

    @Override
    public CourseVideo updateCourseVideo(CourseVideo courseVideo) {
        CourseVideo editedVideo = getCourseVideo(courseVideo.getId());
        editedVideo.setTitle(courseVideo.getTitle());

        return saveCourseVideo(editedVideo);
    }

    @Override
    public void deleteCourseVideo(int videoId) {
        videoRepository.deleteById(videoId);
    }
}
