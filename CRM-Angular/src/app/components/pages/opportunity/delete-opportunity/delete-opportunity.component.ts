import { Component, OnInit } from '@angular/core';
import { Opportunity } from '../../../../dto/Opportunity/Opportunity';
import { OpportunityService } from '../../../../services/Opportunity/opportunity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-delete-opportunity',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-opportunity.component.html',
  styleUrl: './delete-opportunity.component.css',
})
export class DeleteOpportunityComponent implements OnInit {
  opportunity: Opportunity | undefined;
  id: number = 0;

  constructor(
    private opportunityService: OpportunityService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    if (this.id != 0) {
      this.loadOpportunity();
    } else {
      this.router.navigate(['/home/opportunities']);
    }
  }

  loadOpportunity() {
    this.opportunityService.getOpportunity(this.id).subscribe({
      next: (data) => {
        this.opportunity = data;
        this.toastr.info('Fırsat bilgisi yüklendi.'); // Info message
      },
      error: (err) => {
        this.toastr.error('Fırsat bilgisi yüklenirken hata oluştu.'); // Error message
        console.error(err);
      },
      complete: () => console.log('Fırsat getirildi'),
    });
  }

  delete() {
    this.opportunityService.delete(this.id).subscribe({
      next: () => {
        this.toastr.success('Fırsat başarıyla silindi!'); // Success message
        this.router.navigate(['/home/opportunities']);
      },
      error: (err) => {
        this.toastr.error('Fırsat silinirken hata oluştu.'); // Error message
        console.error(err);
      },
      complete: () => console.log('silindi'),
    });
  }

  cancel() {
    this.router.navigate(['/home/opportunities']);
  }
}
