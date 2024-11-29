import { Component, OnInit } from '@angular/core';
import { Opportunity } from '../../../dto/Opportunity/Opportunity';
import { OpportunityService } from '../../../services/Opportunity/opportunity.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-opportunity',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './opportunity.component.html',
  styleUrl: './opportunity.component.css',
})
export class OpportunityComponent implements OnInit {
  opportunities: Opportunity[] | undefined;
  searchTerm: string = '';

  constructor(
    private opportunityService: OpportunityService,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.loadOpportunities();
  }

  loadOpportunities() {
    this.opportunityService.getOpportunities().subscribe({
      next: (data) => {
        this.opportunities = data;
        this.toastr.success('Fırsatlar başarıyla getirildi!'); // Success message
      },
      error: (err) => {
        this.toastr.error('Fırsatlar getirilirken bir hata oluştu.'); // Error message
        console.error(err);
      },
      complete: () => console.log('Fırsatlar getirildi'),
    });
  }

  //Value Orders
  orderByValueAsc() {
    this.opportunityService.getOpportunitiesByValueOrderAsc().subscribe({
      next: (data) => {
        this.opportunities = data;
        this.toastr.success('Fırsatlar başarıyla sıralandı (Artan Değer).'); // Success message
      },
      error: (err) => {
        this.toastr.error('Sıralama işlemi sırasında bir hata oluştu.'); // Error message
        console.error(err);
      },
      complete: () => console.log('Fırsatlar getirildi'),
    });
  }

  orderByValueDesc() {
    this.opportunityService.getOpportunitiesByValueOrderDesc().subscribe({
      next: (data) => {
        this.opportunities = data;
        this.toastr.success('Fırsatlar başarıyla sıralandı (Azalan Değer).'); // Success message
      },
      error: (err) => {
        this.toastr.error('Sıralama işlemi sırasında bir hata oluştu.'); // Error message
        console.error(err);
      },
      complete: () => console.log('Fırsatlar getirildi'),
    });
  }

  // Date Orders
  orderByDateAsc() {
    this.opportunityService.getOpportunitiesByDateOrderAsc().subscribe({
      next: (data) => {
        this.opportunities = data;
        this.toastr.success('Fırsatlar başarıyla sıralandı (Artan Tarih).'); // Success message
      },
      error: (err) => {
        this.toastr.error('Sıralama işlemi sırasında bir hata oluştu.'); // Error message
        console.error(err);
      },
      complete: () => console.log('Fırsatlar getirildi'),
    });
  }

  orderByDateDesc() {
    this.opportunityService.getOpportunitiesByDateOrderDesc().subscribe({
      next: (data) => {
        this.opportunities = data;
        this.toastr.success('Fırsatlar başarıyla sıralandı (Azalan Tarih).'); // Success message
      },
      error: (err) => {
        this.toastr.error('Sıralama işlemi sırasında bir hata oluştu.'); // Error message
        console.error(err);
      },
      complete: () => console.log('Fırsatlar getirildi'),
    });
  }

  // search
  search() {
    this.opportunityService.getOpportunityBySearch(this.searchTerm).subscribe({
      next: (data) => {
        this.opportunities = data;
        this.toastr.success('Arama başarıyla tamamlandı!'); // Success message
      },
      error: (err) => {
        this.toastr.error('Arama işlemi sırasında bir hata oluştu.'); // Error message
        console.error(err);
      },
      complete: () => console.log('Fırsatlar getirildi'),
    });
  }
}
