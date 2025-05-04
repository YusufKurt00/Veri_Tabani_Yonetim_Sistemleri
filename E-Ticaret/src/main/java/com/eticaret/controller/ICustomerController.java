package com.eticaret.controller;

import com.eticaret.dto.DtoCustomer;
import com.eticaret.dto.DtoRegister;

public interface ICustomerController {

    // Kullanıcıyı ID'ye göre bulma
    DtoCustomer findCustomerById(Long id);

    // Giriş yapma işlemi
    String login(String email, String password);

    // Kayıt olma işlemi
    String register(DtoRegister dtoRegister);

}
