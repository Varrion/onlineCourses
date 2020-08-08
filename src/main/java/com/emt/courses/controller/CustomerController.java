package com.emt.courses.controller;

import com.emt.courses.model.Course;
import com.emt.courses.model.Customer;
import com.emt.courses.model.ShoppingCart;
import com.emt.courses.model.dto.CourseDto;
import com.emt.courses.model.dto.CustomerDto;
import com.emt.courses.model.dto.LoginUserDto;
import com.emt.courses.model.dto.PaymentRequest;
import com.emt.courses.service.CourseService;
import com.emt.courses.service.CustomerService;
import com.emt.courses.service.ShoppingCartService;
import com.emt.courses.service.StripeService;
import com.stripe.exception.StripeException;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/user")
public class CustomerController {

    private final CustomerService customerService;
    private final ShoppingCartService cartService;
    private final StripeService stripeService;
    private final CourseService courseService;

    public CustomerController(CustomerService customerService, ShoppingCartService cartService, StripeService stripeService, CourseService courseService, CourseService courseService1) {
        this.customerService = customerService;
        this.cartService = cartService;
        this.stripeService = stripeService;
        this.courseService = courseService1;
    }

    @GetMapping
    List<Customer> getAllUsers(@RequestParam(required = false) Boolean isInstructor) {
        if (isInstructor != null) {
            return customerService.getAllUsersByRole(isInstructor);
        }
        return customerService.getAllCustomers();
    }

    @GetMapping("{username}")
    Optional<Customer> getUserByUsername(@PathVariable String username) {
        return customerService.getCustomerByUsername(username);
    }

    @PostMapping("login")
    Optional<Customer> findUserByUsernameAndPassword(@RequestBody LoginUserDto loginUserDto) {
        return customerService.getCustomerByUsernameAndPassword(loginUserDto);
    }

    @PostMapping
    Customer saveUser(@RequestParam(value = "userPhoto", required = false) MultipartFile photo, @RequestPart("userData") CustomerDto customerDto) throws FileUploadException, IOException {
        return customerService.saveCustomer(photo, customerDto);
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
    Optional<ShoppingCart> getUserShoppingCart(@PathVariable Integer customerId) {
        return cartService.getUserShoppingCart(customerId);
    }

    @PutMapping("{customerId}/cart")
    ShoppingCart updateShoppingCart(@PathVariable Integer customerId, @RequestBody CourseDto courseDto) {
        return cartService.updateShoppingCart(customerId, courseDto);
    }

    @PostMapping("{customerId}/add/{courseId}")
    void addFreeCourse(@PathVariable Integer customerId, @PathVariable Integer courseId) {
        customerService.addFreeCourseToCollection(courseId, customerId);
    }

    @PostMapping("payment")
    public ResponseEntity<String> completePayment(@RequestBody PaymentRequest request) throws StripeException {
        String chargeId = stripeService.createCharge(request);

        return chargeId != null
                ? customerService.addCoursesToCollection(request.getCustomerId())
                ? new ResponseEntity<String>(chargeId, HttpStatus.OK)
                : new ResponseEntity<String>("Error happened while adding courses to collection ", HttpStatus.INTERNAL_SERVER_ERROR)
                : new ResponseEntity<String>("Please check your credit card informations", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("{customerId}/owned-courses")
    public List<Course> getAllOwnedCourses(@PathVariable Integer customerId) {
        Optional<Customer> optionalCustomer = customerService.getCustomer(customerId);
        if (optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();
            return courseService.getAllOwnedCoursesForCustomer(customer);
        }
        return null;
    }

    @ExceptionHandler
    public String handleError(StripeException exception) {
        return exception.getMessage();
    }
}
