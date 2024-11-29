import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer/customer.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CompanyService } from '../../../services/company/company.service';
import { OpportunityService } from '../../../services/Opportunity/opportunity.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [NgxChartsModule], // NgxCharts modülü eklendi
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent implements OnInit {
  // company - sayısal
  totalCompanyCount: number = 0;

  // customers - sayısal
  totalCustomerCount: number = 0;

  // customers - grafik
  customerCountByCompany: any[] = [];

  // opportunity - sayısal
  openOpportunitiesCount: number = 0;
  wonOpportunitiesCount: number = 0;
  lostOpportunitiesCount: number = 0;

  // opportunity - grafik
  getTopCustomers: any[] = [];
  opportunitiesByCompany: any[] = [];

  constructor(
    private customerService: CustomerService,
    private opportunityService: OpportunityService,
    private companyService:CompanyService
  ) {}

  ngOnInit(): void {
    // Müşteri sayısını ve şirket başına müşteri sayısını al
    this.getTotalCustomerCount();
    this.getCustomerCountByCompany();

    //////// opportunity
    this.getTopCustomerByOpportunities();
    this.getOpportunitiesByCompany();
    this.fetchNumericStats();
  }

  fetchNumericStats(){
    this.companyService.getCompanyCount().subscribe((count) => {
      this.totalCompanyCount = count;
    });

    this.opportunityService.getOpenOpportunitiesCount().subscribe((count) => {
      this.openOpportunitiesCount = count;
    });

    // Kazanılmış fırsat sayısını al
    this.opportunityService.getWonOpportunitiesCount().subscribe((count) => {
      this.wonOpportunitiesCount = count;
    });

    // Kaybedilmiş fırsat sayısını al
    this.opportunityService.getLostOpportunitiesCount().subscribe((count) => {
      this.lostOpportunitiesCount = count;
    });
  }

  // sayısal statlar - customer //
  getTotalCustomerCount(): void {
    this.customerService.getTotalCustomerCount().subscribe(
      (response) => {
        this.totalCustomerCount = response.totalCustomerCount; // response.count, API'nın döndürdüğü değeri kullanın
      },
      (error) => {
        console.error('Error fetching total customer count', error);
      }
    );
  }

  // grafik statlar - customer //
  getCustomerCountByCompany(): void {
    this.customerService.getCustomerCountByCompany().subscribe({
      next: (data) => {
        this.customerCountByCompany = data;
      },
      error: (err) => {
        console.error('Error fetching customer data', err);
      },
    });
  }

  // sayısal statlar - opportunity //

  // grafik statlar - opportunity //
  getTopCustomerByOpportunities() {
    this.opportunityService.getTopCustomerByOpportunities().subscribe({
      next: (data) => {
        this.getTopCustomers = data;
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getOpportunitiesByCompany() {
    this.opportunityService.getOpportunitiesByCompany().subscribe({
      next: (data) => {
        this.opportunitiesByCompany = data;
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
