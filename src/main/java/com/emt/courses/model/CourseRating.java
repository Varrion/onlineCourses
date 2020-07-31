package com.emt.courses.model;

import com.emt.courses.model.enums.Rating;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @ManyToOne
    Course course;

    @Enumerated(EnumType.ORDINAL)
    Rating rating;

    String comment;

    @OneToOne
    Customer customer;

    public CourseRating(Rating rating, String comment, Course course) {
        this.rating = rating;
        this.comment = comment;
        this.course = course;
    }
}
