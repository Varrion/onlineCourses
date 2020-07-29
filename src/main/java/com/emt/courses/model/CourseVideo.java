package com.emt.courses.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseVideo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String title;

    String fileName;

    Date uploadedOn;

    String fileType;

    @ManyToOne
    Course course;

    public CourseVideo(String title, String fileType, String fileName, Date uploadedOn) {
        this.title = title;
        this.fileType = fileType;
        this.fileName = fileName;
        this.uploadedOn = uploadedOn;
    }
}
