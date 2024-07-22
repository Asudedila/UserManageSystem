package com.example.demo.Service;

import com.example.demo.Model.Role;
import com.example.demo.Model.RoleAuthority;
import com.example.demo.Repository.RoleAuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RoleAuthorityService {

    @Autowired
    private RoleAuthorityRepository roleAuthorityRepository;

    public List<RoleAuthority> findByRole(Role role) {
        return roleAuthorityRepository.findByRole(role);
    }
    public RoleAuthority addRoleAuthority(RoleAuthority roleAuthority) {
        return roleAuthorityRepository.save(roleAuthority);
    }


    public void deleteRoleAuthority(int id) throws Exception {
        if (roleAuthorityRepository.existsById((long)id)) {
            roleAuthorityRepository.deleteById((long)id);
        } else {
            throw new Exception("RoleAuthority not found");
        }
    }

    public List<RoleAuthority> getAllRoleAuthorities() {
        return (List<RoleAuthority>) roleAuthorityRepository.findAll();
    }


}