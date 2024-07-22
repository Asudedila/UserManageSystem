package com.example.demo.Service;

import com.example.demo.Model.RoleAuthority;
import com.example.demo.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserDetailService implements UserDetailsService {

    private UserService userService;

    @Autowired
    private RoleAuthorityService roleAuthorityService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findByUsernameAndDeleted(username).orElseThrow(() -> new UsernameNotFoundException("not found"));
        List<RoleAuthority> roleAuthorities = roleAuthorityService.findByRole(user.getRole());
        List<SimpleGrantedAuthority> authorities = roleAuthorities.stream()
                .map(roleAuthority -> new SimpleGrantedAuthority(roleAuthority.getAuthority()))
                .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }
}
