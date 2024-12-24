package com.sgdcbrk.crm.dto.opportunity.request;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class OpportunityRequest {
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
    private String name;

    @NotNull(message = "Value cannot be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "Value must be greater than 0")
    private BigDecimal value;

    @NotBlank(message = "Expected close date cannot be blank")
    private String expectedCloseDate;

    @Positive(message = "Customer ID must be a positive number")
    private long customer;
}
