package com.example.demo.Controller;

import com.example.demo.Service.LoginService;
import com.example.demo.Request.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/auth")
public class LoginController {


    @Autowired
    private LoginService loginService;

    @PostMapping("/register")
    public ResponseEntity<LoginRequest> register(@RequestBody LoginRequest reg) throws Exception {
        return ResponseEntity.ok(loginService.register(reg));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginRequest> login(@RequestBody LoginRequest req){
        return ResponseEntity.ok(loginService.login(req));
    }

    @PostMapping("/refresh")
    public ResponseEntity<LoginRequest> refreshToken(@RequestBody LoginRequest req){
        return ResponseEntity.ok(loginService.refreshToken(req));
    }



    @GetMapping("/authorities")
    public ResponseEntity<List<String>> getUserAuthorities(@RequestParam String username) {
        List<String> authorities = loginService.getUserAuthorities(username);
        return ResponseEntity.ok(authorities);
    }



}
