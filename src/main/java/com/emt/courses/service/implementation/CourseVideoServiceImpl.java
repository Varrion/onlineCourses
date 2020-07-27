package com.emt.courses.service.implementation;

import com.emt.courses.model.CourseVideo;
import com.emt.courses.repository.CourseVideoRepository;
import com.emt.courses.service.CourseVideoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public Optional<CourseVideo> getCourseVideo(int videoId) {
        return videoRepository.findById(videoId);
    }

    @Override
    public CourseVideo saveCourseVideo(CourseVideo courseVideo) {
        return videoRepository.save(courseVideo);
    }

    @Override
    public CourseVideo updateCourseVideo(CourseVideo courseVideo) {
        Optional<CourseVideo> optionalCourseVideo = getCourseVideo(courseVideo.getId());

        if (optionalCourseVideo.isPresent()) {
            CourseVideo editedVideo = optionalCourseVideo.get();
            editedVideo.setTitle(courseVideo.getTitle());

            return saveCourseVideo(editedVideo);
        }

        return null;
    }

    @Override
    public void deleteCourseVideo(int videoId) {
        videoRepository.deleteById(videoId);
    }
}
