import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // RouterModule eklendi

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule], // Gerekli modüller dahil edildi
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  username: string = '';
  isDialogOpen: boolean = false; // Dialog başlangıçta kapalı

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (data) => {
        if (data) {
          this.username = data.username;
        }
      },
      error: (e) => {
        console.error(e);
        this.onQuit();
      },
    });
  }

  openDialog() {
    this.isDialogOpen = true; // Modalı aç
  }

  closeDialog() {
    this.isDialogOpen = false; // Modalı kapat
  }

  onQuit(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}

