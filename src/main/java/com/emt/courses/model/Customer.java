package com.emt.courses.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Customer implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String name;

    String surname;

    String username;

    String password;

    String email;

    @Lob
    byte[] picture;

    Boolean isInstructor;

    @OneToOne(mappedBy = "customer")
    @JsonBackReference
    ShoppingCart shoppingCart;

    @ManyToMany
    @JsonBackReference
    Set<Course> ownedCourses;

    public Customer(String name,
                    String surname,
                    String username,
                    String password,
                    String email,
                    Boolean isInstructor,
                    byte[] picture) {
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.password = password;
        this.email = email;
        this.isInstructor = isInstructor;
        this.picture = picture;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
