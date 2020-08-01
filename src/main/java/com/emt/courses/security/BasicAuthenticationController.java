package com.emt.courses.security;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "api")
public class BasicAuthenticationController {

    @GetMapping(path = "basicauth")
    public AuthenticationBean authenticate() {
        return new AuthenticationBean("You are authenticated");
    }
}
