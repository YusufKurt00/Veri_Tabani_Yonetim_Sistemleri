package com.eticaret.service;

import com.eticaret.dto.DtoCustomer;
import com.eticaret.dto.DtoRegister;

public interface ICustomerService {

    // Kullanıcıyı ID'ye göre bulma
    DtoCustomer findCustomerById(Long id);

    // Giriş yapma işlemi
    boolean authenticate(String email, String password);

    // Kayıt olma işlemi
    boolean register(DtoRegister dtoRegister);
}
