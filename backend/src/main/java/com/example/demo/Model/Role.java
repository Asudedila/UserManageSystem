package com.example.demo.Model;

import jakarta.persistence.*;
import lombok.Data;
@Entity
@Table(name="role")
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;


}
