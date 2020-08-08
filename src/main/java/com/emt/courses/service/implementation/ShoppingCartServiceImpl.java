package com.emt.courses.service.implementation;

import com.emt.courses.model.Course;
import com.emt.courses.model.Customer;
import com.emt.courses.model.ShoppingCart;
import com.emt.courses.model.dto.CourseDto;
import com.emt.courses.repository.ShoppingCartRepository;
import com.emt.courses.service.ShoppingCartService;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {

    private final ShoppingCartRepository cartRepository;

    public ShoppingCartServiceImpl(ShoppingCartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public Optional<ShoppingCart> getUserShoppingCart(int customerId) {
        return cartRepository.findByCustomerId(customerId);
    }

    @Override
    public ShoppingCart createEmptyShoppingCart(Customer customer) {
        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setCustomer(customer);

        return cartRepository.save(shoppingCart);
    }

    @Override
    public ShoppingCart updateShoppingCart(int customerId, CourseDto courseDto) {
        Optional<ShoppingCart> optionalShoppingCart = getUserShoppingCart(customerId);

        Course course = new Course(courseDto.id,
                courseDto.name,
                courseDto.description,
                courseDto.price,
                courseDto.isFree);

        if (optionalShoppingCart.isPresent()) {
            ShoppingCart shoppingCart = optionalShoppingCart.get();

            Set<Course> courseSet = shoppingCart.getCourses();
            if (courseSet.contains(course)) {
                courseSet.remove(course);
            } else {
                courseSet.add(course);
            }

            shoppingCart.setCourses(courseSet);
            return cartRepository.save(shoppingCart);
        }
        return null;
    }

    @Override
    public ShoppingCart emptyCoursesFromShoppingCart(ShoppingCart shoppingCart) {
        Customer customer = shoppingCart.getCustomer();
        cartRepository.delete(shoppingCart);
        return createEmptyShoppingCart(customer);
    }
}
