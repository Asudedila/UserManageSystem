package com.example.demo.Service;

import com.example.demo.Model.Role;
import com.example.demo.Model.RoleAuthority;
import com.example.demo.Model.User;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Request.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleService roleService;

    @Autowired
    private RoleAuthorityService roleAuthorityService;

    private PasswordEncoder passwordEncoder;

    public UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder=passwordEncoder;
    }


    public LoginRequest add(LoginRequest req) throws Exception {
        LoginRequest resp = new LoginRequest();
        if( userRepository.existsByTcAndDeleted(req.getTc(),"0")){
            resp.setMessage("User is already registered");
        }else{
            User user = new User();
            user.setTc(req.getTc());
            user.setName(req.getName());
            user.setSurname(req.getSurname());
            user.setGender(req.getGender());
            user.setBirth_date(req.getBirth_date());
            user.setPassword(passwordEncoder.encode(req.getPassword()));
            user.setUsername(req.getUsername());
            Role role = roleService.getRoleByName(req.getRole());
            user.setRole(role);
            userRepository.save(user);}
        return resp;
    }

    public User update(LoginRequest user, String userId) throws Exception {
        User changeUser = userRepository.findByIdAndDeleted(Integer.parseInt(userId),"0").orElseThrow(()-> new Exception("not found "));
        if (!user.getGender().isEmpty()) {
            changeUser.setGender(user.getGender());
        }
        if(!user.getName().isEmpty()){
            changeUser.setName(user.getName());
        }
        if(!user.getSurname().isEmpty() ){
            changeUser.setSurname(user.getSurname());
        }
        if(user.getRole() != null){
            Role role = roleService.getRoleByName(user.getRole());
            changeUser.setRole(role);

        }if(user.getBirth_date() !=null){
            changeUser.setBirth_date(user.getBirth_date());

        }
        return userRepository.save(changeUser);
    }

    public List<User> getAll() {
        return (List<User>) userRepository.findAll();
    }

    public void deleteUser(String userId) throws Exception {
        User user =userRepository.findByIdAndDeleted(Integer.parseInt(userId),"0").orElseThrow(()-> new Exception("not found "));
        user.setDeleted("1");
        userRepository.save(user);

    }

    public List<String> getUserAuthorities(String username) {
        User user = userRepository.findByUsernameAndDeleted(username,"0")
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<RoleAuthority> roleAuthorities = roleAuthorityService.findByRole(user.getRole());
        return roleAuthorities.stream()
                .map(RoleAuthority::getAuthority)
                .collect(Collectors.toList());
    }

    public Optional<User> findByUsernameAndDeleted(String username) {
        return userRepository.findByUsernameAndDeleted(username,"0");
    }

    public boolean existsByTcAndDeleted(String tc) {
        return userRepository.existsByTcAndDeleted(tc,"0");
    }
}
