package com.sgdcbrk.crm.business.concretes;

import com.sgdcbrk.crm.business.abstracts.OpportunityService;
import com.sgdcbrk.crm.business.abstracts.TaskService;
import com.sgdcbrk.crm.business.abstracts.UserService;
import com.sgdcbrk.crm.business.concretes.auth.UserDetailsImp;
import com.sgdcbrk.crm.dto.task.request.TaskRequest;
import com.sgdcbrk.crm.model.task.MeetingType;
import com.sgdcbrk.crm.model.task.Task;
import com.sgdcbrk.crm.model.task.TaskStatus;
import com.sgdcbrk.crm.repository.TaskRepository;
import com.sgdcbrk.crm.util.formatter.DateFormatter;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TaskManager implements TaskService {
    private final TaskRepository taskRepository;
    private final UserService userService;
    private final OpportunityService opportunityService;

    @Override
    public Task getTask(long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    @Override
    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

    @Override
    public void addTask(TaskRequest task) {
        Task newTask = new Task();
        newTask.setTitle(task.getTitle());
        newTask.setDescription(task.getDescription());
        newTask.setUser(userService.getUser(task.getUserId()));
        newTask.setOpportunity(opportunityService.getOpportunity(task.getOpportunityId()));
        newTask.setType(MeetingType.valueOf(task.getType()));
        newTask.setDateOfMeeting(DateFormatter.formatter(task.getDateOfMeeting()));

        // created status is pending
        newTask.setStatus(TaskStatus.PENDING);
        taskRepository.save(newTask);
    }

    @Override
    public void deleteTask(long id) {
        if (taskRepository.existsById(id)){
            taskRepository.deleteById(id);
        }else{
            throw new RuntimeException("Task not found with id: " + id);
        }
    }

    @Override
    public void updateTask(long id, TaskRequest task) {
        var taskOptional = getTask(id);
        taskOptional.setTitle(task.getTitle());
        taskOptional.setDescription(task.getDescription());
        taskOptional.setUser(userService.getUser(task.getUserId()));
        taskOptional.setOpportunity(opportunityService.getOpportunity(task.getOpportunityId()));
        taskOptional.setType(MeetingType.valueOf(task.getType()));
        taskOptional.setDateOfMeeting(DateFormatter.formatter(task.getDateOfMeeting()));


        taskRepository.save(taskOptional);
    }

    @Override
    public void startTask(long id) {
        Task task = getTask(id);
        task.setStatus(TaskStatus.IN_PROGRESS);
        taskRepository.save(task);
    }

    @Override
    public void completeTask(long id) {
        Task task = getTask(id);
        task.setStatus(TaskStatus.COMPLETED);
        taskRepository.save(task);
    }

    @Override
    public void cancelTask(long id) {
        Task task = getTask(id);
        task.setStatus(TaskStatus.CANCELLED);
        taskRepository.save(task);
    }

    @Override
    public List<Task> getTasksByUser(Authentication authentication) {
        var userDetailsImp = (UserDetailsImp) authentication.getPrincipal();
        String email = userDetailsImp.getEmail();

        return taskRepository.findTasksByUserEmail(email).orElseThrow(() -> new RuntimeException("Task not found with email: " + email));
    }

}