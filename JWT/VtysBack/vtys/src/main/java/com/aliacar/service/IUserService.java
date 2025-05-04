package com.aliacar.service;

import com.aliacar.model.User;

public interface IUserService {

    User save(User user);

    User findByEmail(String email);

    boolean existsByEmail(String email);

    User findByEmailAndPassword(String email, String password);
    
 

}
