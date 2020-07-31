package com.emt.courses.model.dto;

import lombok.Data;

@Data
public class CustomerDto {
    String name;

    String surname;

    String username;

    String password;

    String email;

    Boolean isInstructor;
}
