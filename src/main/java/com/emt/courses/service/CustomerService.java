package com.emt.courses.service;

import com.emt.courses.model.Customer;
import com.emt.courses.model.dto.CustomerDto;
import com.emt.courses.model.dto.LoginUserDto;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface CustomerService extends UserDetailsService {

    List<Customer> getAllCustomers();

    List<Customer> getAllUsersByRole(boolean isInstructor);

    Optional<Customer> getCustomer(int userId);

    Optional<Customer> getCustomerByUsername(String username);

    Optional<Customer> getCustomerByUsernameAndPassword(LoginUserDto loginUserDto);

    Customer updateCustomer(Customer user);

    Customer saveCustomer(MultipartFile photo, CustomerDto customerDto) throws FileUploadException, IOException;

    void deleteCustomer(int userId);

}
