package com.emt.courses.service.implementation;

import com.emt.courses.model.Course;
import com.emt.courses.model.Customer;
import com.emt.courses.model.ShoppingCart;
import com.emt.courses.repository.ShoppingCartRepository;
import com.emt.courses.service.ShoppingCartService;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {

    private final ShoppingCartRepository cartRepository;

    public ShoppingCartServiceImpl(ShoppingCartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public ShoppingCart getUserShoppingCart(int customerId) {
        return cartRepository.getShoppingCartByCustomerId(customerId);
    }

    @Override
    public ShoppingCart createEmptyShoppingCart(Customer customer) {
        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setCustomer(customer);

        return cartRepository.save(shoppingCart);
    }

    @Override
    public ShoppingCart updateShoppingCart(int customerId, Set<Course> courses) {
        ShoppingCart shoppingCart = getUserShoppingCart(customerId);
        shoppingCart.setCourses(courses);

        return cartRepository.save(shoppingCart);
    }

    @Override
    public ShoppingCart buyCourseFromShoppingCart(int customerId, Course course) {
        ShoppingCart shoppingCart = getUserShoppingCart(customerId);
        shoppingCart.getCourses().remove(course);

        return cartRepository.save(shoppingCart);
    }
}
