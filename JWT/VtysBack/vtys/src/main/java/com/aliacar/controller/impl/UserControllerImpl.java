package com.aliacar.controller.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aliacar.controller.IUserController;
import com.aliacar.model.User;
import com.aliacar.service.IUserService;

@RestController
@RequestMapping("/api/auth")
public class UserControllerImpl implements IUserController {

    @Autowired
    private IUserService userService;
    
    @PostMapping("/login")
    @Override
    public User findByEmailAndPassword(@RequestParam(name = "email") String email, @RequestParam(name = "password") String password) {
        User user = userService.findByEmailAndPassword(email, password);

        if(user!=null){
            return user;
        }
        return null;
        
    }


    @PostMapping("/register")
    @Override
    public User saveUser(@RequestBody User user) {
       return  userService.save(user);
        
    }

    

    



    

}
