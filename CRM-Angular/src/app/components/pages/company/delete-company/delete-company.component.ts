import { Component, OnInit } from '@angular/core';
import { company } from '../../../../dto/company/company.dto';
import { CompanyService } from '../../../../services/company/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-company',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './delete-company.component.html',
  styleUrls: ['./delete-company.component.css'],
})
export class DeleteCompanyComponent implements OnInit {
  company: company | undefined;
  routerId: string | null = null;
  CompanyId: number | undefined;

  constructor(
    private companyService: CompanyService,
    private router: ActivatedRoute,
    private navigator: Router,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.routerId = this.router.snapshot.paramMap.get('id');
    this.CompanyId = Number(this.routerId);

    if (this.CompanyId) {
      this.findCompanyById(this.CompanyId);
    } else {
      this.cancel();
    }
  }

  findCompanyById(id: number) {
    this.companyService.findCompanyById(id).subscribe({
      next: (data) => {
        this.company = data;
        console.log('Şirket bulundu:', data);
        this.toastr.info('Şirket bilgileri başarıyla yüklendi.'); // Info toast
      },
      error: (err) => {
        console.error('Hata oluştu:', err);
        this.toastr.error('Şirket bilgileri alınırken bir hata oluştu.'); // Error toast
        this.navigator.navigate(['/home/companies']);
      },
      complete: () => {
        console.log('Şirket bilgileri çekildi.');
      },
    });
  }

  deleteCompanyById(id: number) {
    this.companyService.deleteCompany(id).subscribe({
      next: (data) => {
        console.log('Şirket silindi:', data);
        this.toastr.success('Şirket başarıyla silindi!'); // Success toast
        this.navigator.navigate(['/home/companies']);
      },
      error: (err) => {
        console.error('Hata oluştu:', err);
        this.toastr.error('Şirket silinirken bir hata oluştu.'); // Error toast
      },
      complete: () => {
        console.log('Silme işlemi tamamlandı.');
      },
    });
  }

  cancel() {
    this.navigator.navigate(['/home/companies']);
  }
}
