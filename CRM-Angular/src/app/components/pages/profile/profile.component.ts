import { Component, OnInit } from '@angular/core';
import { TaskResponse } from '../../../dto/task/task.response';
import { TaskService } from '../../../services/Task/task.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { employees } from '../../../dto/employee/employee';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  tasks: TaskResponse[] = [];
  user: employees = {
    id: 0,
    username: '',
    email: '',
    roles: [],
  };

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.userService.getCurrentUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => console.error(err),
    });
  }

  loadTasks(): void {
    this.taskService.getTasksByUser().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (error) => {
        this.toastr.error('Görevler yüklenirken hata oluştu', 'Hata');
        console.error(error);
      },
    });
  }

  startTask(id: number): void {
    this.taskService.startTask(id).subscribe({
      next: (data) => {
        console.log(data.text);

        this.toastr.success('Görev başlatıldı!', 'Başarılı');
        this.loadTasks(); // Görev listesini güncelle
      },
      error: (error) => {
        this.toastr.error('Görev başlatılamadı', 'Hata');
        console.error(error);
      },
    });
  }

  completeTask(id: number): void {
    this.taskService.completeTask(id).subscribe({
      next: (data) => {
        console.log(data.text);
        this.toastr.success('Görev tamamlandı!', 'Başarılı');
        this.loadTasks(); // Görev listesini güncelle
      },
      error: (error) => {
        this.toastr.error('Görev tamamlanamadı', 'Hata');
        console.error(error);
      },
    });
  }

  cancelTask(id: number): void {
    this.taskService.cancelTask(id).subscribe({
      next: (data) => {
        console.log(data.text);
        this.toastr.success('Görev iptal edildi', 'Başarılı');
        this.loadTasks(); // Görev listesini güncelle
      },
      error: (error) => {
        this.toastr.error('Görev iptal edilemedi', 'Hata');
        console.error(error);
      },
    });
  }
}
