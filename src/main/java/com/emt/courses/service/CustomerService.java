package com.emt.courses.service;

import com.emt.courses.model.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerService {

    List<Customer> getAllCustomers();

    List<Customer> getAllUsersByRole(boolean isInstructor);

    Optional<Customer> getCustomer(int userId);

    Customer updateCustomer(Customer user);

    Customer saveCustomer(Customer user);

    void deleteCustomer(int userId);

}
