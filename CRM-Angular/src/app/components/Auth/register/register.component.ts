import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { RegisterRequest } from '../../../dto/auth/register-request';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  passwordCheck: string = '';

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
    if (this.password !== this.passwordCheck) {
      this.toastrService.warning('Şifreler uyuşmuyor!');
      return;
    }

    if (
      !this.username ||
      !this.email ||
      !this.password ||
      !this.passwordCheck
    ) {
      this.toastrService.warning('Lütfen tüm alanları doldurun!');

      return;
    }

    const registerRequest: RegisterRequest = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        this.toastrService.success('Kayıt Başarılı');
        console.log('register başarılı', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastrService.warning('Kayıt Başarısız');

        console.error('register başarısız', error);
      },
    });
  }
}
