package com.example.demo.Service;

import com.example.demo.Model.User;
import com.example.demo.Request.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;

@Service
public class LoginService {

    @Autowired
    private UserService userService;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;

    public LoginRequest register(LoginRequest registrationRequest) throws Exception {
        LoginRequest resp = new LoginRequest();
        if (userService.existsByTcAndDeleted(registrationRequest.getTc())) {
            resp.setMessage("User Already Exist");
        } else {
            userService.add(registrationRequest);
            resp.setMessage("User Saved Successfully");
        }
        return resp;
    }
    public LoginRequest login(LoginRequest loginRequest) {
        LoginRequest response = new LoginRequest();

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            User user = userService.findByUsernameAndDeleted(loginRequest.getUsername()).orElseThrow(() -> new Exception("User not found"));
            String jwt = jwtUtils.generateToken(user);
            String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            response.setToken(jwt);
            response.setRole(user.getRole().getName());
            response.setRefreshToken(refreshToken);
            response.setMessage("Successfully Logged In");
        } catch (Exception e) {
            response.setMessage(e.getMessage());
        }
        return response;
    }


    public LoginRequest refreshToken(LoginRequest refreshTokenRequest){
        LoginRequest response = new LoginRequest();
        try{
            String username = jwtUtils.extractUsername(refreshTokenRequest.getToken());
            User users = userService.findByUsernameAndDeleted(username).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenRequest.getToken(), users)) {
                var jwt = jwtUtils.generateToken(users);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenRequest.getToken());
                response.setMessage("Successfully Refreshed Token");
            }
            return response;

        }catch (Exception e){
            response.setMessage(e.getMessage());
            return response;
        }
    }

    public List<String> getUserAuthorities(String username) {
        return userService.getUserAuthorities(username);
    }
}

