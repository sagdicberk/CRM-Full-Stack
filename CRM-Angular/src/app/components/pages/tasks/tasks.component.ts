import { Component, OnInit, Pipe } from '@angular/core';
import { TaskResponse } from '../../../dto/task/task.response';
import { TaskService } from '../../../services/Task/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  tasks: TaskResponse[] | undefined;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (data) => (this.tasks = data),
      error: (err) => console.error(err),
      complete: () => console.log('Görevler getirildi'),
    });
  }
}
