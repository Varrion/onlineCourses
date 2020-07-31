package com.emt.courses.service;

import com.emt.courses.model.Customer;
import com.emt.courses.model.dto.CustomerDto;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface CustomerService {

    List<Customer> getAllCustomers();

    List<Customer> getAllUsersByRole(boolean isInstructor);

    Optional<Customer> getCustomer(int userId);

    Customer updateCustomer(Customer user);

    Customer saveCustomer(MultipartFile photo, CustomerDto customerDto) throws FileUploadException;

    void deleteCustomer(int userId);
}
