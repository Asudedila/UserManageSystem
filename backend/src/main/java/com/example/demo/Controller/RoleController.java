package com.example.demo.Controller;

import com.example.demo.Model.Role;
import com.example.demo.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping("/addRole")
    @PreAuthorize("hasAnyAuthority('USER_MANAGE')")
    public Role createUser(@RequestBody Role role) {
        return roleService.add(role);
    }

    @PostMapping("/updateRole")
    @PreAuthorize("hasAnyAuthority('USER_MANAGE')")
    public Role updateRole(@RequestBody Role role, @RequestParam Integer roleId) throws Exception {
        return roleService.update(role,roleId);
    }
    @PostMapping("/deleteRole")
    @PreAuthorize("hasAnyAuthority('USER_MANAGE')")
    public void deleteRole(@RequestParam String roleId) {
        roleService.deleteRole(roleId);
    }

    @GetMapping("/getAllRole")
    public List<Role> getAllRole() {
        return roleService.getAll();
    }



}
