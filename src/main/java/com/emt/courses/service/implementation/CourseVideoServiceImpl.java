package com.emt.courses.service.implementation;

import com.emt.courses.model.Course;
import com.emt.courses.model.CourseVideo;
import com.emt.courses.repository.CourseVideoRepository;
import com.emt.courses.service.CourseService;
import com.emt.courses.service.CourseVideoService;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CourseVideoServiceImpl implements CourseVideoService {

    private final CourseVideoRepository videoRepository;
    private final CourseService courseService;

    private static final String UPLOADED_FOLDER = "frontend/public/videos/";

    public CourseVideoServiceImpl(CourseVideoRepository videoRepository, CourseService courseService) {
        this.videoRepository = videoRepository;
        this.courseService = courseService;
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
    public CourseVideo saveCourseVideo(MultipartFile file, int courseId) throws FileUploadException {
        String fileName = file.getOriginalFilename();
        Course course = courseService.getCourse(courseId).get();

        LocalDateTime localDate = LocalDateTime.now();
        Date date = java.sql.Date.valueOf(localDate.toLocalDate());
        try {
            byte[] bytes = file.getBytes();
            String videoName = UUID.randomUUID() + fileName;
            Path path = Paths.get(UPLOADED_FOLDER + videoName);
            Files.write(path, bytes);

            CourseVideo courseVideo = new CourseVideo(fileName, file.getContentType(), videoName, date);
            courseVideo.setCourse(course);
            return videoRepository.save(courseVideo);
        } catch (IOException ex) {
            throw new FileUploadException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    @Override
    public CourseVideo updateCourseVideo(CourseVideo courseVideo) {
        Optional<CourseVideo> optionalCourseVideo = getCourseVideo(courseVideo.getId());

        if (optionalCourseVideo.isPresent()) {
            CourseVideo editedVideo = optionalCourseVideo.get();
            editedVideo.setTitle(courseVideo.getTitle());

            return videoRepository.save(courseVideo);
        }

        return null;
    }

    @Override
    public void deleteCourseVideo(int videoId) {
        videoRepository.deleteById(videoId);
    }
}
