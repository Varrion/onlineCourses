package com.emt.courses.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String name;

    String description;

    Integer price;

    @ManyToOne
    CourseCategory category;

    @ManyToOne
    @JsonManagedReference
    Customer instructor;

    @ManyToMany(mappedBy = "courses")
    @JsonBackReference
    Set<ShoppingCart> shoppingCarts;

    Boolean isFree;

    @ManyToMany(mappedBy = "ownedCourses")
    Set<Customer> customers;

    public Course(Integer id,
                  String name,
                  String description,
                  Integer price,
                  Boolean isFree) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.isFree = isFree;
    }

    @Override
    public boolean equals(Object o) {

        if (o == this) return true;
        if (!(o instanceof Course)) {
            return false;
        }

        Course course = (Course) o;

        return course.name.equals(name) &&
                course.id.equals(id);
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + name.hashCode();
        result = 31 * result + price;
        result = 31 * result + description.hashCode();
        return result;
    }
}

