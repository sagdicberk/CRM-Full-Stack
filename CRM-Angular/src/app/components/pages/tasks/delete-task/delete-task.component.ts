import { Component, OnInit } from '@angular/core';
import { TaskResponse } from '../../../../dto/task/task.response';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../../services/Task/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css'],
})
export class DeleteTaskComponent implements OnInit {
  task: TaskResponse | undefined;
  id: number = 0;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    if (this.id != 0) {
      this.loadTask();
    } else {
      this.cancel();
    }
  }

  // Load task details
  loadTask() {
    this.taskService.getTask(this.id).subscribe({
      next: (data) => {
        this.task = data;
        this.toastr.info('Görev başarıyla yüklendi'); // Info message in Turkish
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Görev yüklenirken bir hata oluştu'); // Error message in Turkish
      },
      complete: () => console.log('Görev Getirildi'),
    });
  }

  // Delete the task
  delete() {
    this.taskService.deleteTask(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.toastr.success('Görev başarıyla silindi!'); // Success message in Turkish
        setTimeout(() => {
          this.router.navigate(['/home/tasks']);
        }, 2500); // Redirect after delay
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Görev silinirken bir hata oluştu'); // Error message in Turkish
      },
    });
  }

  // Cancel and navigate to tasks list
  cancel() {
    this.router.navigate(['/home/tasks']);
  }
}
