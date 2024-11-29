import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../../services/customer/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { customer } from '../../../../dto/customer/customer';
import { company } from '../../../../dto/company/company.dto';
import { CompanyService } from '../../../../services/company/company.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { customerResponse } from '../../../../dto/customer/customer.response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-customer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.css',
})
export class UpdateCustomerComponent implements OnInit {
  customer: customer = {
    id: 0,
    name: '',
    address: '',
    phone: '',
    email: '',
    companyId: 0,
  };

  existingCustomer: customerResponse = {
    id: 0,
    name: '',
    address: '',
    phone: '',
    email: '',
    company: {} as company,
  };

  companies: company[] | undefined;
  routeId: string | null = null;
  id: number = 0;

  constructor(
    private customerService: CustomerService,
    private companyService: CompanyService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
    this.routeId = this.activeRoute.snapshot.paramMap.get('id');
    this.id = Number(this.routeId);
    if (this.id) {
      this.loadCustomer(this.id);
    } else {
      this.router.navigate(['/home/customers']);
    }
  }

  loadCompanies() {
    this.companyService.findAllCompanies().subscribe({
      next: (Data) => {
        this.companies = Data;
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Şirketler yüklenirken hata oluştu');
        return;
      },
      complete: () => console.log('Şirketler başarıyla yüklendi'),
    });
  }

  loadCustomer(id: number) {
    this.customerService.findCustomerById(id).subscribe({
      next: (data) => {
        if (data) {
          this.existingCustomer = data;
        } else {
          this.router.navigate(['/home/customers']);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Müşteriler yüklenirken hata oluştu');
      },
      complete: () => console.log('müşteri başarıyla yüklendi'),
    });
  }

  updateCustomer() {
    // existingCustomer'dan alınan verilerle customer nesnesini oluştur
    this.customer.id = this.existingCustomer.id;
    this.customer.name = this.existingCustomer.name;
    this.customer.address = this.existingCustomer.address;
    this.customer.phone = this.existingCustomer.phone;
    this.customer.email = this.existingCustomer.email;
    this.customer.companyId = this.existingCustomer.company.id;

    // API'ye customer nesnesini gönder
    this.customerService
      .updateCustomer(this.customer.id, this.customer)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.toastrService.success('Müşteri başarıyla güncellendi');
          this.router.navigate(['/home/customers']);
        },
        error: (err) => {
          this.toastrService.error('Güncelleme sırasında bir hata oluştu');
          console.error(err);
        },
        complete: () => console.log('Güncelleme başarılı'),
      });
  }
}
