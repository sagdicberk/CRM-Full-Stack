import { Component, OnInit } from '@angular/core';
import { TaskRequest } from '../../../../dto/task/task.request';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { TaskService } from '../../../../services/Task/task.service';
import { OpportunityService } from '../../../../services/Opportunity/opportunity.service';
import { employees } from '../../../../dto/employee/employee';
import { Opportunity } from '../../../../dto/Opportunity/Opportunity';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  taskRequest: TaskRequest = {
    title: '',
    description: '',
    userId: 0,
    opportunityId: 0,
    type: '',
    dateOfMeeting: '',
  };
  employees: employees[] = [];
  opportunities: Opportunity[] = [];
  MeetingTypeEnum = ['PHONE', 'EMAIL', 'MEETING'];

  constructor(
    private router: Router,
    private userservice: UserService,
    private opportunityService: OpportunityService,
    private taskService: TaskService,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadOpportunity();
  }

  create() {
    this.taskService.createTask(this.taskRequest).subscribe({
      next: (data) => {
        console.log(data);
        this.toastr.success('Görev başarıyla oluşturuldu!'); // Success message in Turkish
        this.router.navigate(['/home/tasks']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Görev oluşturulurken bir hata oluştu'); // Error message in Turkish
      },
      complete: () => console.log('Görev oluşturuldu'),
    });
  }

  cancel() {
    this.router.navigate(['/home/tasks']);
  }

  loadUsers() {
    this.userservice.getAllUser().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Çalışanlar yüklenirken bir hata oluştu'); // Error message in Turkish
      },
      complete: () => console.log('Çalışanlar getirildi'),
    });
  }

  loadOpportunity() {
    this.opportunityService.getOpportunities().subscribe({
      next: (data) => {
        this.opportunities = data;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Fırsatlar yüklenirken bir hata oluştu'); // Error message in Turkish
      },
      complete: () => console.log('Fırsatlar getirildi'),
    });
  }
}
