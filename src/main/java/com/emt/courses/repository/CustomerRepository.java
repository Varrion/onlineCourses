package com.emt.courses.repository;

import com.emt.courses.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Integer> {

    @Transactional
    List<Customer> getAllByIsInstructor(boolean isInstructor);

    @Transactional
    Optional<Customer> getByUsernameAndPassword(String username, String password);

    @Transactional
    Optional<Customer> getByUsername(String username);
}
