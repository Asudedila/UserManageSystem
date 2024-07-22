package com.example.demo.Request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDate;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class LoginRequest {

    private String message;
    private String token;
    private String refreshToken;
    private String tc;
    private String name;
    private String surname;
    private String gender;
    private String role;
    private String deleted;
    private String username;
    private String password;
    private LocalDate birth_date;


}
