import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../../services/customer/customer.service';
import { Router } from '@angular/router';
import { customer } from '../../../../dto/customer/customer';
import { CompanyService } from '../../../../services/company/company.service';
import { company } from '../../../../dto/company/company.dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
  customer: customer = {
    id: 0,
    name: '',
    address: '',
    phone: '',
    email: '',
    companyId: 0,
  };

  companies: company[] = [];

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private companyService: CompanyService,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  // Şirketleri yükleyen metod
  loadCompanies(): void {
    this.companyService.findAllCompanies().subscribe({
      next: (data) => {
        this.companies = data;
      },
      error: (err) => {
        console.error('Şirketler yüklenirken bir hata oluştu:', err);
        this.toastr.error('Şirketler yüklenirken bir hata oluştu!', 'Hata'); // Show error message
      },
    });
  }

  // Müşteri oluşturma fonksiyonu
  createCustomer(): void {
    if (this.validateForm()) {
      this.customerService.createCustomer(this.customer).subscribe({
        next: (response) => {
          console.log(response);
          this.toastr.success('Müşteri başarıyla oluşturuldu!', 'Başarılı'); // Show success message

          setTimeout(() => {
            this.router.navigate(['/home/customers']);
          }, 2000);
        },
        error: (err) => {
          console.error('Müşteri oluşturulurken bir hata oluştu:', err);
          this.toastr.error('Müşteri oluşturulurken bir hata oluştu!', 'Hata'); // Show error message
        },
      });
    }
  }

  // Form doğrulama fonksiyonu
  validateForm(): boolean {
    if (
      !this.customer.name ||
      !this.customer.address ||
      !this.customer.phone ||
      !this.customer.email ||
      !this.customer.companyId
    ) {
      this.toastr.warning('Lütfen tüm alanları doldurun!', 'Uyarı'); // Show warning message
      return false;
    }
    return true;
  }
}
