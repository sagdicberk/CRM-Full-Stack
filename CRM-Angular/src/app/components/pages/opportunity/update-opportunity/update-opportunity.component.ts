import { Component, OnInit } from '@angular/core';
import { OpportunityService } from '../../../../services/Opportunity/opportunity.service';
import { Opportunity } from '../../../../dto/Opportunity/Opportunity';
import { OpportunityRequest } from '../../../../dto/Opportunity/Opportunity-request';
import { customer } from '../../../../dto/customer/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../../services/customer/customer.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { customerResponse } from '../../../../dto/customer/customer.response';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-update-opportunity',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './update-opportunity.component.html',
  styleUrl: './update-opportunity.component.css',
})
export class UpdateOpportunityComponent implements OnInit {
  opportunity: Opportunity = {
    name: '',
    value: 0,
    expectedCloseDate: '',
    customer: {} as customerResponse,
    id: 0,
    status: '',
    createdAt: '',
    updatedAt: '',
  };

  request: OpportunityRequest = {
    name: '',
    value: 0,
    expectedCloseDate: '',
    customer: 0,
  };

  customers: customer[] = [];
  id: number = 0;

  constructor(
    private opportunityService: OpportunityService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private customerService: CustomerService,
    private datePipe: DatePipe,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    if (this.id) {
      this.loadOpportunity();
    } else {
      console.error(`${this.id} is invalid`);
      this.router.navigate(['/home/opportunities']);
    }
  }

  loadOpportunity() {
    this.opportunityService.getOpportunity(this.id).subscribe({
      next: (data) => {
        this.opportunity = data;
        // Formu doldurmak için request'i güncelle
      },
      error: (err) => {
        this.toastr.error('Fırsat bilgisi yüklenirken hata oluştu.'); // Error message
        console.error(err);
      },
      complete: () => console.log('Fırsat bilgisi yüklendi'),
    });
  }

  loadCustomers() {
    this.customerService.findAllCustomers().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (err) => {
        this.toastr.error('Müşteri listesi yüklenirken hata oluştu.'); // Error message
        console.error(err);
      },
      complete: () => console.log('Müşteri listesi yüklendi'),
    });
  }

  updateOpportunity() {
    const formattedDate = this.datePipe.transform(
      this.opportunity.expectedCloseDate,
      'yyyy-MM-dd'
    ) as string;

    this.request = {
      name: this.opportunity.name,
      value: this.opportunity.value,
      expectedCloseDate: formattedDate,
      customer: this.opportunity.customer.id,
    };

    this.opportunityService.update(this.id, this.request).subscribe({
      next: () => {
        this.toastr.success('Fırsat başarıyla güncellendi!'); // Success message
        console.log('Güncelleme başarılı');
        this.router.navigate(['/home/opportunities']);
      },
      error: (err) => {
        this.toastr.error('Güncelleme sırasında hata oluştu.'); // Error message
        console.error('Güncelleme sırasında hata:', err);
      },
      complete: () => console.log('Güncelleme işlemi tamamlandı'),
    });
  }

  cancel() {
    this.router.navigate(['/home/opportunities']);
  }
}
