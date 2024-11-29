import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpportunityService } from '../../../../services/Opportunity/opportunity.service';
import { CustomerService } from '../../../../services/customer/customer.service';
import { customer } from '../../../../dto/customer/customer';
import { CommonModule } from '@angular/common';
import { OpportunityRequest } from '../../../../dto/Opportunity/Opportunity-request';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-opportunity',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './create-opportunity.component.html',
  styleUrls: ['./create-opportunity.component.css'],
})
export class CreateOpportunityComponent implements OnInit {
  newOpportunity: OpportunityRequest = {
    name: '',
    value: 0,
    expectedCloseDate: '',
    customer: 0,
  };

  customers: customer[] = [];

  constructor(
    private router: Router,
    private opportunityService: OpportunityService,
    private customerService: CustomerService,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  // Load customers to populate the dropdown
  loadCustomers() {
    this.customerService.findAllCustomers().subscribe({
      next: (response) => (this.customers = response),
      error: (err) => console.error('Error loading customers:', err),
    });
  }

  // Submit the form
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.opportunityService.create(this.newOpportunity).subscribe({
        next: () => {
          this.toastr.success('Opportunity created successfully!');
          this.router.navigate(['/home/opportunities']);
        },
        error: (err) => {
          this.toastr.error('Error creating opportunity!');
          console.error('Error creating opportunity:', err);
        },
      });
    } else {
      this.toastr.error('Please fill all the required fields correctly.');
    }
  }

  // Cancel and navigate back to opportunities list
  cancel() {
    this.router.navigate(['/home/opportunities']);
  }
}
