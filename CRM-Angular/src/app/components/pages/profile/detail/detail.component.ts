import { Component, OnInit } from '@angular/core';
import { TaskResponse } from '../../../../dto/task/task.response';
import { TaskService } from '../../../../services/Task/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  task: TaskResponse = {
    title: '',
    description: '',
    opportunity: {
      name: '',
      value: 0,
      status: '',
      expectedCloseDate: '',
      createdAt: '',
      updatedAt: '',
      customer: {
        email: '',
        name: '',
        address: '',
        phone: '',
        createdAt: '',
        company: {
          name: '',
          email: '',
          address: '',
          phone: '',
          industry: '',
          id: 0
        },
        id: 0
      },
      id: 0
    },
    id: 0,
    user: {
      id: 0,
      username: '',
      email: '',
      roles: []
    },
    type: '',
    status: '',
    dateOfMeeting: ''
  };

  id: number = 0;

  constructor(
    private taskService: TaskService,
    private activeRouter: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.activeRouter.snapshot.paramMap.get('id'));
    if (this.id != 0) {
      this.loadTask();
      if (!this.task) {
        this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/home']);
    }
  }

  loadTask(): void {
    this.taskService.getTask(this.id).subscribe({
      next: (data) => {
        this.task = data;
      },
      error: (error) => {
        this.toastr.error('Görevler yüklenirken hata oluştu', 'Hata');
        console.error(error);
      },
    });
  }
}
