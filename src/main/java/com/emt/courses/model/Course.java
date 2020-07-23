package com.emt.courses.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String name;

    String description;

    Integer price;

    @ManyToOne(cascade = CascadeType.ALL)
    CourseCategory category;

    @ManyToOne(cascade = CascadeType.ALL)
    Customer instructor;

    @ManyToMany(mappedBy = "courses")
    Set<ShoppingCart> shoppingCarts;

    Boolean isFree;
}
