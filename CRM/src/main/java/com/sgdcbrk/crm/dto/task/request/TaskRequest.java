package com.sgdcbrk.crm.dto.task.request;

import com.sgdcbrk.crm.model.task.MeetingType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequest {

    @NotBlank(message = "Title cannot be blank")
    @Size(min = 3, max = 100, message = "Title must be between 3 and 100 characters")
    private String title;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    @Positive(message = "User ID must be a positive number")
    private long userId;

    @Positive(message = "Opportunity ID must be a positive number")
    private long opportunityId;

    @NotBlank(message = "Type cannot be blank")
    private String type;

    @NotBlank(message = "Date of meeting cannot be blank")
    private String dateOfMeeting;
}
