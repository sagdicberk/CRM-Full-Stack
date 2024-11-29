import { Component, OnInit } from '@angular/core';
import { TaskRequest } from '../../../../dto/task/task.request';
import { employees } from '../../../../dto/employee/employee';
import { Opportunity } from '../../../../dto/Opportunity/Opportunity';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { OpportunityService } from '../../../../services/Opportunity/opportunity.service';
import { TaskService } from '../../../../services/Task/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskResponse } from '../../../../dto/task/task.response';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService for error/success feedback

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [DatePipe],
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
})
export class UpdateTaskComponent implements OnInit {
  taskResponse: TaskResponse = {
    id: 0,
    title: '',
    description: '',
    user: {} as employees,
    opportunity: {} as Opportunity,
    type: '',
    status: '',
    dateOfMeeting: '',
  };

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
  id: number = 0;

  constructor(
    private toastr: ToastrService, // Inject ToastrService for success/error feedback
    private datePipe: DatePipe,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private userservice: UserService,
    private opportunityService: OpportunityService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadOpportunity();
    this.id = Number(this.ActivatedRoute.snapshot.paramMap.get('id'));
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
        this.taskResponse = data;
        // If needed, you can add further manipulation here
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Görev yüklenirken bir hata oluştu'); // Error message in Turkish
      },
      complete: () => console.log('Task loaded'),
    });
  }

  // Update task request
  update() {
    const formattedDate =
      this.datePipe.transform(this.taskResponse.dateOfMeeting, 'yyyy-MM-dd') ||
      '';

    this.taskRequest = {
      title: this.taskResponse.title,
      description: this.taskResponse.description,
      type: this.taskResponse.type,
      dateOfMeeting: formattedDate,
      opportunityId: this.taskResponse.opportunity.id,
      userId: this.taskResponse.user.id,
    };

    this.taskService.updateTask(this.id, this.taskRequest).subscribe({
      next: (data) => {
        this.toastr.success('Görev başarıyla güncellendi!'); // Success message in Turkish
        this.router.navigate(['/home/tasks']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Görev güncellenirken bir hata oluştu'); // Error message in Turkish
      },
      complete: () => console.log('Task updated'),
    });
  }

  // Cancel and navigate to tasks list
  cancel() {
    this.router.navigate(['/home/tasks']);
  }

  // Load users (employees)
  loadUsers() {
    this.userservice.getAllUser().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Çalışanlar yüklenirken bir hata oluştu'); // Error message in Turkish
      },
      complete: () => console.log('Employees loaded'),
    });
  }

  // Load opportunities
  loadOpportunity() {
    this.opportunityService.getOpportunities().subscribe({
      next: (data) => {
        this.opportunities = data;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Fırsatlar yüklenirken bir hata oluştu'); // Error message in Turkish
      },
      complete: () => console.log('Opportunities loaded'),
    });
  }
}
