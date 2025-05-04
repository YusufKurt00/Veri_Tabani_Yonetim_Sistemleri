package com.eticaret.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoRegister {

    private String name;
    private String email;
    private String password;
    private String passwordConfirm;

}
