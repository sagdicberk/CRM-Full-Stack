import { Component, OnInit } from '@angular/core';
import { UpdateUserRequest } from '../../../../dto/user/update-user-request';
import { UserService } from '../../../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-update-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-employess.component.html',
  styleUrls: ['./update-employess.component.css'],
})
export class UpdateEmployessComponent implements OnInit {
  user: UpdateUserRequest = {
    email: '',
    username: '',
    roles: [],
  };
  routeId: number | undefined = undefined;
  roles: string[] = ['USER', 'ADMIN'];

  constructor(
    private userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.loadRoles();
    this.routeId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    if (this.routeId) {
      this.loadUser(this.routeId);
    } else {
      this.router.navigate(['/home/employees']);
    }
  }

  loadRoles(): void {
    this.userService.getRoles().subscribe({
      next: (data) => (this.roles = data),
      error: (err) => this.handleError(err),
    });
  }

  loadUser(id: number): void {
    this.userService.getUser(id).subscribe({
      next: (data) => (this.user = data),
      error: (err) => this.handleError(err),
    });
  }

  updateUser(): void {
    this.userService.updateUser(this.user, this.routeId!).subscribe({
      next: () => {
        this.toastr.success('Kullanıcı başarıyla güncellendi!'); // Success message using toastr
        this.router.navigate(['/home/employees']);
      },
      error: (err) => {
        this.toastr.error('Güncelleme işlemi sırasında bir hata oluştu.'); // Error message using toastr
        this.handleError(err);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/home/employees']);
  }

  private handleError(error: any): void {
    console.error('Hata:', error);
  }
}
