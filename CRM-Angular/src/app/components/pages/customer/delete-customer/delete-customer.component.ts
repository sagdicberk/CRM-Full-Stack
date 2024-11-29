import { Component, OnInit } from '@angular/core';
import { customerResponse } from '../../../../dto/customer/customer.response';
import { CustomerService } from '../../../../services/customer/customer.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-delete-customer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './delete-customer.component.html',
  styleUrl: './delete-customer.component.css',
})
export class DeleteCustomerComponent implements OnInit {
  customer: customerResponse | undefined;
  RouterId: string | null = null;
  id: number = 0;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.RouterId = this.activeRoute.snapshot.paramMap.get('id');
    this.id = Number(this.RouterId);
    if (this.id) {
      this.loadCustomer(this.id);
    } else {
      this.router.navigate(['/home/customers']);
    }
  }

  deleteCustomer() {
    this.customerService.deleteCustomer(this.id).subscribe({
      next: (Data) => {
        this.toastr.success('Müşteri başarıyla silindi!', 'Başarılı');
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Müşteri silinirken bir hata oluştu.', 'Hata');
      },
      complete: () => {
        this.router.navigate(['/home/customers']);
      },
    });
  }

  loadCustomer(id: number) {
    this.customerService.findCustomerById(id).subscribe({
      next: (Data) => (this.customer = Data),
      error: (err) => {
        console.error(err);
        this.toastr.error('Müşteri yüklenirken bir hata oluştu.', 'Hata');
      },
      complete: () => console.log('Müşteri başarıyla yüklendi'),
    });
  }

  cancel() {
    this.router.navigate(['/home/customers']);
  }
}
