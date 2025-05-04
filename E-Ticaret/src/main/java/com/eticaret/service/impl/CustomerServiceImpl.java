package com.eticaret.service.impl;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eticaret.dto.DtoCustomer;
import com.eticaret.dto.DtoRegister;
import com.eticaret.entities.Customer;
import com.eticaret.repository.CustomerRepository;
import com.eticaret.service.ICustomerService;

@Service
public class CustomerServiceImpl implements ICustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public DtoCustomer findCustomerById(Long id) {
        DtoCustomer dtoCustomer = new DtoCustomer();

        Optional<Customer> optional = customerRepository.findById(id);
        if (optional.isEmpty()) {
            return null;
        }
        Customer customer = optional.get();
        BeanUtils.copyProperties(customer, dtoCustomer);

        return dtoCustomer;
    }

    @Override
    public boolean authenticate(String email, String password) {
        // Email ve şifre ile kullanıcıyı doğrula
        Customer customer = customerRepository.findByEmail(email);

        if (customer != null && customer.getPassword().equals(password)) {
            return true;
        }
        return false;
    }

    @Override
    public boolean register(DtoRegister dtoRegister) {
        // Email ile kullanıcıyı kontrol et
        Customer existingCustomer = customerRepository.findByEmail(dtoRegister.getEmail());

        if (existingCustomer != null) {
            // Email zaten varsa kayıt yapılmaz
            return false;
        }

        // Şifreleri karşılaştır
        if (!dtoRegister.getPassword().equals(dtoRegister.getPasswordConfirm())) {
            // Şifreler uyuşmuyor
            return false;
        }

        // Yeni kullanıcıyı kaydet
        Customer newCustomer = new Customer();
        newCustomer.setName(dtoRegister.getName());
        newCustomer.setEmail(dtoRegister.getEmail());
        newCustomer.setPassword(dtoRegister.getPassword());

        customerRepository.save(newCustomer);
        return true;
    }

}
