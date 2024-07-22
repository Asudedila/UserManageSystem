package com.example.demo.Model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name="Users")
@Data
@Component
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String tc;
    private String name;
    private String surname;
    private String gender;
    private String deleted="0";
    private String username;
    private String password;
    private LocalDate birth_date;
    @ManyToOne
    @JoinColumn(name = "role", referencedColumnName = "id")
    private Role role;



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.toString()));}

}
