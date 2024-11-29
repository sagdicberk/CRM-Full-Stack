package com.sgdcbrk.crm.dto.customer.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateCustomerRequest {
    private String name;

    private String address;

    private String phone;

    private String email;

    private long companyId;

}
