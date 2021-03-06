package com.emt.courses.repository;

import com.emt.courses.model.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Integer> {

    @Transactional
    Optional<ShoppingCart> findByCustomerId(int customerId);
}
