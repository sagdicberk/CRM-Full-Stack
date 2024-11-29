import { Component, OnInit } from '@angular/core';
import { employees } from '../../../../dto/employee/employee';
import { UserService } from '../../../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUserRequest } from '../../../../dto/user/update-user-request';

@Component({
  selector: 'app-create-employess',
  standalone: true,
  imports: [],
  templateUrl: './create-employess.component.html',
  styleUrl: './create-employess.component.css',
})
export class CreateEmployessComponent {
}
