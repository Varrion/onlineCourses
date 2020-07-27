package com.emt.courses.controller;

import com.emt.courses.model.Course;
import com.emt.courses.model.ShoppingCart;
import com.emt.courses.model.Customer;
import com.emt.courses.service.ShoppingCartService;
import com.emt.courses.service.CustomerService;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/user")
public class CustomerController {

    private final CustomerService customerService;
    private final ShoppingCartService cartService;

    public CustomerController(CustomerService customerService, ShoppingCartService cartService) {
        this.customerService = customerService;
        this.cartService = cartService;
    }

    @GetMapping
    List<Customer> getAllUsers(@RequestParam(required = false) Boolean isInstructor) {
        if (isInstructor != null) {
            return customerService.getAllUsersByRole(isInstructor);
        }
        return customerService.getAllCustomers();
    }

    @GetMapping("{id}")
    Optional<Customer> getUser(@PathVariable Integer id) {
        return customerService.getCustomer(id);
    }

    @PostMapping
    Customer saveUser(@RequestBody Customer user) {
        return customerService.saveCustomer(user);
    }

    @PutMapping
    Customer updateUser(@RequestBody Customer user) {
        return customerService.updateCustomer(user);
    }

    @DeleteMapping("{id}")
    void deleteUser(@PathVariable Integer id) {
        customerService.deleteCustomer(id);
    }

    @GetMapping("{customerId}/cart")
    ShoppingCart getUserShoppingCart(@PathVariable Integer customerId) {
        return cartService.getUserShoppingCart(customerId);
    }

    @PutMapping("{customerId}/cart")
    ShoppingCart updateShoppingCart(@PathVariable Integer customerId, @RequestBody Set<Course> courses) {
        return cartService.updateShoppingCart(customerId, courses);
    }

    @PostMapping("{customerId}/cart/buy-course")
    ShoppingCart buyCourseFromCart(@PathVariable Integer customerId, @RequestBody Course course) {
        return cartService.buyCourseFromShoppingCart(customerId,course);
    }
}