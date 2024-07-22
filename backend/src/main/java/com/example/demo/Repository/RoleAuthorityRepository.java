package com.example.demo.Repository;


import com.example.demo.Model.Role;
import com.example.demo.Model.RoleAuthority;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleAuthorityRepository extends CrudRepository<RoleAuthority, Long> {
    List<RoleAuthority> findByRole(Role role);
}