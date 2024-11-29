import { Component } from '@angular/core';
import { CompanyService } from '../../../../services/company/company.service';
import { company } from '../../../../dto/company/company.dto';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css'],
})
export class CreateCompanyComponent {
  // Yeni şirket için başlangıçta boş bir nesne oluşturuluyor
  newCompany: company = {
    id: 0,
    name: '',
    address: '',
    phone: '',
    email: '',
    industry: '',
  };

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  // Yeni şirketi oluşturma fonksiyonu
  createCompany() {
    if (this.isFormValid(this.newCompany)) {
      // Şirket oluşturuluyor ve servis çağrılıyor
      this.companyService.createCompany(this.newCompany).subscribe(
        (response) => {
          // Başarılı yanıt alındığında yapılacak işlemler
          this.toastrService.success('Şirket başarıyla oluşturuldu');
          console.log('Şirket başarıyla oluşturuldu:', response);
          this.router.navigate(['/home/companies']);
        },
        (error) => {
          // Hata durumunda yapılacak işlemler
          const errorMessage =
            error?.message || 'Şirket oluşturulurken bir hata oluştu';
          this.toastrService.error('Şirket oluşturulurken bir hata oluştu'); // Hata mesajını daha açıklayıcı yapıyoruz
          console.error('Hata oluştu:', error);
          return;
        }
      );
    } else {
      // Hatalı formu kullanıcıya bildir
      this.toastrService.warning('Lütfen tüm alanları doğru şekilde doldurun.');
    }
  }

  // Form verilerinin doğruluğunu kontrol eden fonksiyon
  private isFormValid(company: company): boolean {
    return (
      company.name !== '' &&
      company.address !== '' &&
      company.phone !== '' &&
      company.email !== '' &&
      company.industry !== ''
    );
  }
}
