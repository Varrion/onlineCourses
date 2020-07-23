package com.emt.courses.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String name;

    String surname;

    String username;

    String password;

    String email;

    String picture;

    Boolean isInstructor;

    @OneToOne(mappedBy = "customer")
    ShoppingCart shoppingCart;
}
