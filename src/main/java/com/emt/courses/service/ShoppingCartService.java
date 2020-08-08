package com.emt.courses.service;

import com.emt.courses.model.Customer;
import com.emt.courses.model.ShoppingCart;
import com.emt.courses.model.dto.CourseDto;

import java.util.Optional;

public interface ShoppingCartService {
    ShoppingCart createEmptyShoppingCart(Customer customer);

    Optional<ShoppingCart> getUserShoppingCart(int customerId);

    ShoppingCart updateShoppingCart(int customerId, CourseDto courseDto);

    ShoppingCart emptyCoursesFromShoppingCart(ShoppingCart shoppingCart);
}
