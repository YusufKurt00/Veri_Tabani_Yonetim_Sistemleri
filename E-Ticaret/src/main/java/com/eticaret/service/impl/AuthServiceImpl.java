package com.eticaret.service.impl;

import org.springframework.stereotype.Service;

import com.eticaret.entities.Customer;
import com.eticaret.repository.CustomerRepository;
import com.eticaret.service.IAuthService;

@Service
public class AuthServiceImpl implements IAuthService {

    private final CustomerRepository customerRepository;
    private final EmailServiceImpl emailService;

    public AuthServiceImpl(CustomerRepository customerRepository, EmailServiceImpl emailService) {
        this.customerRepository = customerRepository;
        this.emailService = emailService;
    }

    @Override
    public void sendPasswordByEmail(String email) {
        Customer customer = customerRepository.findByEmail(email);

        if (customer == null) {
            System.out.println("Kullanıcı bulunamadı.");
            return;
        }

        String message = "Merhaba " + customer.getName() + ",\n\n"
                + "Şifreniz: " + customer.getPassword() + "\n\n"
                + "Giriş yaptıktan sonra şifrenizi değiştirmeniz önerilir.";

        emailService.sendEmail(customer.getEmail(), "Şifreniz", message);
    }

}
