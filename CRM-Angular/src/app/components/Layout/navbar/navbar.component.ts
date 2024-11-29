import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isOpen = true;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAdmin().subscribe({
      next: (isAdmin) => {
        this.isAdmin = isAdmin;
      },
      error: (err) => {
        console.error('Error checking admin status:', err);
      },
    });
  }

  navItems = [
    {
      icon: 'fa fa-users',
      label: 'Müşteriler',
      link: '/home/customers',
      isVisible: () => true,
    },
    {
      icon: 'fa fa-users',
      label: 'Çalışanlar',
      link: '/home/employees',
      isVisible: () => this.isAdmin,
    },
    {
      icon: 'fa fa-building',
      label: 'Şirketler',
      link: '/home/companies',
      isVisible: () => true,
    },
    {
      icon: 'fa fa-eye',
      label: 'Fırsatlar',
      link: '/home/opportunities',
      isVisible: () => true,
    },
    {
      icon: 'fa fa-list',
      label: 'Görevler',
      link: '/home/tasks',
      isVisible: () => this.isAdmin,
    },
    {
      icon: 'fa fa-bar-chart',
      label: 'Analiz',
      link: '/home/stats',
      isVisible: () => this.isAdmin,
    },
  ];

  toggleNav() {
    this.isOpen = !this.isOpen;
  }
}
