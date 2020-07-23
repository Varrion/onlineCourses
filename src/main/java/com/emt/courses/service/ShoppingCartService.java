package com.emt.courses.service;

import com.emt.courses.model.Course;
import com.emt.courses.model.ShoppingCart;

import java.util.Set;

public interface ShoppingCartService {
    ShoppingCart createEmptyShoppingCart(int customerId);

    ShoppingCart getUserShoppingCart(int customerId);

    ShoppingCart updateShoppingCart(int customerId, Set<Course> courses);

    ShoppingCart buyCourseFromShoppingCart(int customerId, Course course);
}
