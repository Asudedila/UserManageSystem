package com.example.demo.Model;

import jakarta.persistence.*;
import lombok.Data;
//date ,user silinsede login veriyor onu kontrol et,foreign key
@Entity
@Table(name="role")
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;


}
