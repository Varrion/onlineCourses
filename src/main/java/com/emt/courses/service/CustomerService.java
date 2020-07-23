package com.emt.courses.service;

import com.emt.courses.model.Customer;

import java.util.List;

public interface CustomerService {

    List<Customer> getAllCustomers();

    Customer getCustomer(int userId);

    Customer updateCustomer(Customer user);

    Customer saveCustomer(Customer user);

    void deleteCustomer(int userId);

}
