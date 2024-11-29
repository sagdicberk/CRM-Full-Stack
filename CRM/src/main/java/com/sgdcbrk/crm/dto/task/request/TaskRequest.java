package com.sgdcbrk.crm.dto.task.request;

import com.sgdcbrk.crm.model.task.MeetingType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequest {

    private String title;

    private String description;

    private long userId;

    private long opportunityId;

    private String type;

    private String dateOfMeeting;
}
