import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company/company.service';
import { company } from '../../../dto/company/company.dto';
import { CommonModule } from '@angular/common';
import { timeout } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr'; // Import ToastrService


@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule ],
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class CompanyComponent implements OnInit {
  companies: company[] | undefined;
  searchTerm: string = '';

  constructor(
    private companyService: CompanyService,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.findAllCompanies();
  }

  // Tüm şirketleri listele
  findAllCompanies() {
    this.companyService
      .findAllCompanies()
      .pipe(timeout(10000))
      .subscribe(
        (data) => {
          if (data) {
            this.companies = data;
            console.log('Şirketler başarıyla yüklendi!'); // Success toast
          }
        },
        (error) => {
          this.companies = [];
          this.toastr.error('Şirketlere ulaşılamadı. Lütfen tekrar deneyin.'); // Error toast
          console.error('Şirketlere ulaşılamadı', error);
        }
      );
  }

  // Arama fonksiyonu
  searchName() {
    if (this.searchTerm.trim()) {
      // Eğer arama terimi varsa, boşluklar hariç
      this.companyService
        .findCompanyByName(this.searchTerm.trim())
        .pipe(timeout(10000))
        .subscribe(
          (data) => {
            if (data.length > 0) {
              this.companies = data; // Arama sonuçlarını al
            } else {
              this.companies = [];
              this.toastr.warning('Aradığınız şirket bulunamadı.'); // Warning toast
            }
          },
          (error) => {
            this.companies = [];
            this.toastr.error(
              'Arama işlemi gerçekleşmedi. Lütfen tekrar deneyin.'
            ); // Error toast
            console.error('Arama işlemi gerçekleşmedi', error);
          }
        );
    } else {
      // Arama terimi boş ise, tüm şirketleri listele
      this.findAllCompanies();
    }
  }
}
