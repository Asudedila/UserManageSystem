package com.example.demo.Controller;

import com.example.demo.Model.RoleAuthority;
import com.example.demo.Service.RoleAuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roleAuthorities")
public class RoleAuthorityController {

    @Autowired
    private RoleAuthorityService roleAuthorityService;

    @GetMapping("/getAll")
    public List<RoleAuthority> getAllRoleAuthorities() {
        return roleAuthorityService.getAllRoleAuthorities();
    }

    @PostMapping("/addRoleAuthority")
    public RoleAuthority addRoleAuthority(@RequestBody RoleAuthority roleAuthority) {
        return roleAuthorityService.addRoleAuthority(roleAuthority);
    }

    @DeleteMapping("/deleteRoleAuthority")
    public void deleteRoleAuthority(@RequestParam int id) throws Exception {
        roleAuthorityService.deleteRoleAuthority(id);
    }
}
