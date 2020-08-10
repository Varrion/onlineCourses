package com.emt.courses.model;

import com.emt.courses.model.enums.Rating;
import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @JsonBackReference
    Course course;

    @Enumerated(EnumType.ORDINAL)
    Rating rating;

    String comment;

    @OneToOne
    Customer customer;

    public CourseRating(Rating rating, String comment, Course course, Customer customer) {
        this.rating = rating;
        this.comment = comment;
        this.course = course;
        this.customer = customer;
    }
}
