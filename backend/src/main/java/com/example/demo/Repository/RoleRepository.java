package com.example.demo.Repository;

import com.example.demo.Model.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {


    Optional<Role> findByName(String roleName);
}
