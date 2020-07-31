package com.emt.courses.model.dto;

import lombok.Data;

@Data
public class CourseRatingDto {
    Integer id;

    Integer rating;

    String comment;

    Integer customerId;
}
