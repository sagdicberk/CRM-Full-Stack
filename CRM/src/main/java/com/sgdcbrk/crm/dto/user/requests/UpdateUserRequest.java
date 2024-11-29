package com.sgdcbrk.crm.dto.user.requests;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {

    private String username;

    private String email;

    private Set<String> roles;
}
