package com.sgdcbrk.crm.controller;

import com.sgdcbrk.crm.business.abstracts.TaskService;
import com.sgdcbrk.crm.dto.task.request.TaskRequest;
import com.sgdcbrk.crm.model.task.Task;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@AllArgsConstructor
public class TaskController {
    private final TaskService taskService;


    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getTasks();
        return ResponseEntity.ok(tasks);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable long id) {
        Task task = taskService.getTask(id);
        return ResponseEntity.ok(task);
    }


    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody @Valid TaskRequest task) {
        try{
            taskService.addTask(task);
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable long id, @RequestBody @Valid TaskRequest taskDetails) {
        try{
            taskService.updateTask(id, taskDetails);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task deleted");
    }


    @PostMapping("/{id}/start")
    public ResponseEntity<?> startTask(@PathVariable long id) {
        taskService.startTask(id);
        return ResponseEntity.ok("Task started");
    }


    @PostMapping("/{id}/complete")
    public ResponseEntity<?> completeTask(@PathVariable long id) {
        taskService.completeTask(id);
        return ResponseEntity.ok("Task completed");
    }


    @PostMapping("/{id}/cancel")
    public ResponseEntity<?> cancelTask(@PathVariable long id) {
        taskService.cancelTask(id);
        return ResponseEntity.ok("Task cancelled");
    }

    @GetMapping("/get-tasks-by-user")
    public ResponseEntity<List<Task>> getTasksByUser(Authentication authentication) {
        try{
            return  ResponseEntity.ok(taskService.getTasksByUser(authentication));
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }

    }
}