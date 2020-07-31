package com.emt.courses.service.implementation;

import com.emt.courses.model.CourseVideo;
import com.emt.courses.model.Customer;
import com.emt.courses.model.dto.CustomerDto;
import com.emt.courses.repository.CustomerRepository;
import com.emt.courses.service.CustomerService;
import com.emt.courses.service.ShoppingCartService;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

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

            return customerRepository.save(updatedCustomer);
        }
        return null;
    }

    @Override
    public Customer saveCustomer(MultipartFile picture, CustomerDto customerDto) throws FileUploadException {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(picture.getOriginalFilename()));
        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileUploadException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            Customer customer = new Customer(customerDto.getName(),
                    customerDto.getSurname(),
                    customerDto.getUsername(),
                    customerDto.getPassword(),
                    customerDto.getEmail(),
                    customerDto.getIsInstructor(),
                    picture.getBytes());

            Customer savedCustomer = customerRepository.save(customer);

            if (!savedCustomer.getIsInstructor()) {
                shoppingCartService.createEmptyShoppingCart(savedCustomer);
            }
            return savedCustomer;
        } catch (IOException | FileUploadException ex) {
            throw new FileUploadException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    @Override
    public void deleteCustomer(int customerId) {
        customerRepository.deleteById(customerId);
    }
}
