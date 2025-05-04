package com.aliacar.controller;

import com.aliacar.model.User;

public interface IUserController {


    User findByEmailAndPassword(String email, String password);

    User saveUser(User user);

   
    
}
