import { Component, OnInit } from '@angular/core';
import { employees } from '../../../dto/employee/employee';
import { UserService } from '../../../services/user/user.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-employess',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './employess.component.html',
  styleUrls: ['./employess.component.css'],
})
export class EmployessComponent implements OnInit {
  employess: employees[] | undefined;
  searchTerm: string = '';

  constructor(
    private userService: UserService,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUser().subscribe({
      next: (data) => {
        this.employess = data;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Aranan sonuca uygun çalışan bulunamadı', 'Hata'); // Show error message using toastr
      },
      complete: () => console.log('Kullanıcılar getirildi'),
    });
  }

  getUserBySearch(): void {
    this.userService.searchUser(this.searchTerm).subscribe({
      next: (Data) => {
        if (Data) {
          this.employess = Data;
        } else {
          this.getAllUsers();
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Çalışan araması sırasında bir hata oluştu', 'Hata'); // Show error message using toastr
      },
      complete: () => console.log('Arama başarıyla tamamlandı'),
    });
  }
}
