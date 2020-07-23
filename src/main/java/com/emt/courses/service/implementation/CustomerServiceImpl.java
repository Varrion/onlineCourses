package com.emt.courses.service.implementation;

import com.emt.courses.model.Customer;
import com.emt.courses.repository.CustomerRepository;
import com.emt.courses.service.CustomerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Customer getCustomer(int customerId) {
        return customerRepository.getOne(customerId);
    }

    @Override
    public Customer updateCustomer(Customer user) {
        Customer updatedCustomer = getCustomer(user.getId());
        updatedCustomer.setEmail(user.getEmail());
        updatedCustomer.setName(user.getName());
        updatedCustomer.setSurname(user.getSurname());
        updatedCustomer.setPassword(user.getPassword());
        updatedCustomer.setPicture(user.getPicture());
        updatedCustomer.setIsInstructor(user.getIsInstructor());

        return saveCustomer(updatedCustomer);
    }

    @Override
    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public void deleteCustomer(int customerId) {
        customerRepository.deleteById(customerId);
    }
}
