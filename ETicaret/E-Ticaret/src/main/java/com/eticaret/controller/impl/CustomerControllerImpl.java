package com.eticaret.controller.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eticaret.controller.ICustomerController;
import com.eticaret.dto.DtoCustomer;
import com.eticaret.dto.DtoRegister;
import com.eticaret.service.ICustomerService;

@RestController
@RequestMapping("/customer")
public class CustomerControllerImpl implements ICustomerController {

    @Autowired
    private ICustomerService customerService;

    @GetMapping(path = "/list/{id}")
    @Override
    public DtoCustomer findCustomerById(@PathVariable(name = "id") Long id) {
        return customerService.findCustomerById(id);
    }

    @PostMapping("/login")
    @Override
    public String login(@RequestParam String email, @RequestParam String password) {
        boolean isAuthenticated = customerService.authenticate(email, password);
        if (isAuthenticated) {
            return "Login successful!";
        } else {
            return "Invalid email or password!";
        }
    }

    // Register işlemi
    @PostMapping("/register")
    @Override
    public String register(@RequestBody DtoRegister dtoRegister) {
        boolean isRegistered = customerService.register(dtoRegister);
        if (isRegistered) {
            return "Registration successful!";
        } else {
            return "Error during registration! Please check your details.";
        }
    }

}
