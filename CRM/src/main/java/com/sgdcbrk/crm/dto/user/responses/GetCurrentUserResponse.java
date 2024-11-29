package com.sgdcbrk.crm.dto.user.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetCurrentUserResponse {
    private String email;
    private String username;
}
