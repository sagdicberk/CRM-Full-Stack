import { Component, OnInit } from '@angular/core';
import { employees } from '../../../../dto/employee/employee';
import { UserService } from '../../../../services/user/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-employess',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './delete-employess.component.html',
  styleUrl: './delete-employess.component.css',
})
export class DeleteEmployessComponent implements OnInit {
  employee: employees | undefined;
  routerId: string | null = null;
  id: number | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.routerId = this.activedRoute.snapshot.paramMap.get('id');
    this.id = Number(this.routerId);
    if (this.id) {
      this.getEmployee(this.id);
    } else {
      this.router.navigate(['/home/employess']);
    }
  }

  getEmployee(id: number): void {
    this.userService.getUser(id).subscribe({
      next: (Data) => (this.employee = Data),
      error: (err) => this.handleError(err),
      complete: () => console.log('Kullanıcı getirme işlemi başarılı'),
    });
  }

  deleteEmployee(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: (Data) => {
        console.log('kullanıcı silindi', Data);
        this.toastr.success('Çalışan başarıyla silindi!'); // Success message using toastr
        this.router.navigate(['/home/employees']);
      },
      error: (err) => {
        this.toastr.error('Silme işlemi sırasında bir hata oluştu.'); // Error message using toastr
        this.handleError(err);
      },
      complete: () => console.log('Silme işlemi tamamlandı'),
    });
  }

  cancel() {
    this.router.navigate(['/home/employees']);
  }

  private handleError(error: any): void {
    console.error('Hata:', error);
  }
}
