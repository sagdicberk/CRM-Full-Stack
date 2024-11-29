package com.sgdcbrk.crm.business.abstracts;

import com.sgdcbrk.crm.dto.task.request.TaskRequest;
import com.sgdcbrk.crm.model.task.Task;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface TaskService {
    Task getTask(long id);
    List<Task> getTasks();

    void addTask(TaskRequest task);
    void deleteTask(long id);
    void updateTask(long id,TaskRequest task);

    void startTask(long id);
    void completeTask(long id);
    void cancelTask(long id);

    List<Task> getTasksByUser(Authentication authentication);

}
