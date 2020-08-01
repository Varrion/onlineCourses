package com.emt.courses.service.implementation;

import com.emt.courses.model.Customer;
import com.emt.courses.model.dto.CustomerDto;
import com.emt.courses.model.dto.LoginUserDto;
import com.emt.courses.repository.CustomerRepository;
import com.emt.courses.service.CustomerService;
import com.emt.courses.service.ShoppingCartService;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
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
    public Optional<Customer> getCustomerByUsername(String username) {
        return customerRepository.getByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Customer> optionalCustomer = getCustomerByUsername(username);
        optionalCustomer.orElseThrow(() -> new UsernameNotFoundException("User with username: " + username + "is not found"));

        return optionalCustomer.get();
    }

    @Override
    public Optional<Customer> getCustomerByUsernameAndPassword(LoginUserDto loginUserDto) throws UsernameNotFoundException {
        Optional<Customer> optionalCustomer = customerRepository.getByUsernameAndPassword(loginUserDto.getUsername(), loginUserDto.getPassword());

        optionalCustomer.orElseThrow(() -> new UsernameNotFoundException("User with username: " + loginUserDto.getUsername() + "is not found"));
        return optionalCustomer;
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
    public Customer saveCustomer(MultipartFile picture, CustomerDto customerDto) throws FileUploadException, IOException {
        String fileName = "";
        byte[] pictureBytes = null;

        if (picture != null) {
            fileName = StringUtils.cleanPath(Objects.requireNonNull(picture.getOriginalFilename()));
            pictureBytes = picture.getBytes();

        }
        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new FileUploadException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            Customer customer = new Customer(customerDto.getName(),
                    customerDto.getSurname(),
                    customerDto.getUsername(),
                    customerDto.getPassword(),
                    customerDto.getEmail(),
                    customerDto.getIsInstructor(),
                    pictureBytes);

            Customer savedCustomer = customerRepository.save(customer);

            if (!savedCustomer.getIsInstructor()) {
                shoppingCartService.createEmptyShoppingCart(savedCustomer);
            }
            return savedCustomer;
        } catch (FileUploadException ex) {
            throw new FileUploadException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    @Override
    public void deleteCustomer(int customerId) {
        customerRepository.deleteById(customerId);
    }
}
