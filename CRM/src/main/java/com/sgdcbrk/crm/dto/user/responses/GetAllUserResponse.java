package com.sgdcbrk.crm.dto.user.responses;

import com.sgdcbrk.crm.model.user.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllUserResponse {
    private long id;
    private String username;
    private String email;
    private Set<Role> roles;
}
