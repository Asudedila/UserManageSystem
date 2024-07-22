package com.example.demo.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="Role_Authority")
@Data
public class RoleAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String authority;

    @ManyToOne
    @JoinColumn(name = "role", referencedColumnName = "id")
    private Role role;
}
