package com.sgdcbrk.crm.dto.customer.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateCustomerRequest {
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @Size(max = 200, message = "Address must not exceed 200 characters")
    private String address;

    @Pattern(regexp = "\\+?[0-9]{10,15}", message = "Phone must be a valid number with 10-15 digits")
    private String phone;

    @Email(message = "Invalid email format")
    private String email;

    @Positive(message = "Company ID must be a positive number")
    private long companyId;
}
