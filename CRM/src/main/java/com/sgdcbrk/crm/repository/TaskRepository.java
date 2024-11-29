package com.sgdcbrk.crm.repository;

import com.sgdcbrk.crm.model.task.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    Optional<List<Task>> findTasksByUserEmail(String email);

}
