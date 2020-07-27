package com.emt.courses.service.implementation;

import com.emt.courses.model.Customer;
import com.emt.courses.repository.CustomerRepository;
import com.emt.courses.service.CustomerService;
import com.emt.courses.service.ShoppingCartService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final ShoppingCartService shoppingCartService;

    public CustomerServiceImpl(CustomerRepository customerRepository, ShoppingCartService shoppingCartService) {
        this.customerRepository = customerRepository;
        this.shoppingCartService = shoppingCartService;
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public List<Customer> getAllUsersByRole(boolean isInstructor) {
        return customerRepository.getAllByIsInstructor(isInstructor);
    }

    @Override
    public Optional<Customer> getCustomer(int customerId) {
        return customerRepository.findById(customerId);
    }

    @Override
    public Customer updateCustomer(Customer user) {
        Optional<Customer> optionalCustomer = getCustomer(user.getId());

        if (optionalCustomer.isPresent()) {
            Customer updatedCustomer = optionalCustomer.get();
            updatedCustomer.setEmail(user.getEmail());
            updatedCustomer.setName(user.getName());
            updatedCustomer.setSurname(user.getSurname());
            updatedCustomer.setPassword(user.getPassword());
            updatedCustomer.setPicture(user.getPicture());
            updatedCustomer.setIsInstructor(user.getIsInstructor());

            return saveCustomer(updatedCustomer);
        }

        return null;
    }

    @Override
    public Customer saveCustomer(Customer customer) {

        if (!customer.getIsInstructor()) {
            shoppingCartService.createEmptyShoppingCart(customer);
        }

        return customerRepository.save(customer);
    }

    @Override
    public void deleteCustomer(int customerId) {
        customerRepository.deleteById(customerId);
    }
}
