package com.emt.courses.repository;

import com.emt.courses.model.Course;
import com.emt.courses.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {

    @Transactional
    List<Course> getAllByInstructorId(int instructorId);

    @Transactional
    List<Course> getAllByCategoryId(int categoryId);

    @Transactional
    List<Course> getAllByIsFree(boolean isFree);

    @Transactional
    List<Course> findAllByCustomersIs(Customer customer);

    @Transactional
    @Query(
            value = "SELECT c.* from course c\n" +
                    "INNER JOIN shopping_cart_courses sc ON c.id = sc.courses_id\n" +
                    "INNER JOIN shopping_cart s ON s.id = sc.shopping_carts_id \n" +
                    "WHERE s.customer_id = ?1",
            nativeQuery = true)
    List<Course> getAllByShoppingCartId(int shoppingCartId);

    @Transactional
    @Query(value = "SELECT c.* FROM course c\n" +
            "LEFT JOIN shopping_cart_courses sc on c.id = sc.courses_id\n" +
            "LEFT JOIN shopping_cart s on s.id = sc.shopping_carts_id\n" +
            "WHERE s.customer_id = ?1 AND c.id = ?2", nativeQuery = true)
    Optional<Course> getCourseByCustomerShoppingCartAndId(int customerId, int courseId);
}
