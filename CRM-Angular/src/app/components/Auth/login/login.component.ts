import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../../dto/auth/login-request';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    // Form gönderildiğinde yapılacak işlemler
    const loginRequest: LoginRequest = {
      email: this.email,
      password: this.password,
    };

    if (this.email == '' || this.password == '') {
      this.toastrService.warning('Email ve Şifre boş bırakılamaz');
      return;
    }

    this.authService.login(loginRequest).subscribe({
      next: (token) => {
        if (token) {
          console.log('login başarılı', token);
          this.toastrService.success('Giriş Başarılı');
          sessionStorage.setItem('token', token);

          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error(error);

        this.toastrService.warning('Geçersiz Email veya Şifre');
      },
      complete: () => console.log('Giriş yapıldı'),
    });
  }
}
