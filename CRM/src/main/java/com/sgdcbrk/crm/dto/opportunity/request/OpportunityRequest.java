package com.sgdcbrk.crm.dto.opportunity.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class OpportunityRequest {
    private String name;
    private BigDecimal value;
    private String expectedCloseDate;
    private long customer;
}
