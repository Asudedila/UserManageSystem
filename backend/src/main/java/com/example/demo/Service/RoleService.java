package com.example.demo.Service;

import com.example.demo.Model.Role;
import com.example.demo.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public Role getRoleByName(String roleName) throws Exception {
        Optional<Role> roleOptional = roleRepository.findByName(roleName);
        if (roleOptional.isPresent()) {
            return roleOptional.get();
        } else {
            throw new Exception("Role not found");
        }
    }
    public Role add(Role role) {
        return roleRepository.save(role);
    }

    public Role update(Role role, Integer id) throws Exception {
        Role changeRole=roleRepository.findById(Long.valueOf(id)).orElseThrow(()-> new Exception("not found "));
        if(!role.getName().isEmpty()){
            changeRole.setName(role.getName());
        }

        return add(changeRole);
    }

    public void deleteRole(String roleId) {
        roleRepository.deleteById(Long.valueOf(roleId));
    }

    public List<Role> getAll() {
        return (List<Role>) roleRepository.findAll();
    }
}
