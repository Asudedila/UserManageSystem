package com.example.demo.Controller;

import com.example.demo.Model.User;
import com.example.demo.Request.LoginRequest;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/add")
    @PreAuthorize("hasAnyAuthority('MANAGE')")
    public LoginRequest createUser(@RequestBody LoginRequest user) throws Exception {
        return userService.add(user);
    }

    @PostMapping("/update")
    @PreAuthorize("hasAnyAuthority('MANAGE')")
    public User update(@RequestBody LoginRequest user,@RequestParam String userId) throws Exception {
        return userService.update(user,userId);
    }

    @GetMapping("/getAll")
    public List<User> getAllUser() {
        return userService.getAll();
    }

    @PostMapping("/delete")
    @PreAuthorize("hasAnyAuthority('MANAGE')")
    public void deleteUser(@RequestParam String userId) throws Exception{
        userService.deleteUser(userId);
    }





}

