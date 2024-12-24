import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpportunityRequest } from '../../dto/Opportunity/Opportunity-request';
import { Observable } from 'rxjs';
import { Opportunity } from '../../dto/Opportunity/Opportunity';
import {ConfigService} from "../../config/config.service";

@Injectable({
  providedIn: 'root',
})
export class OpportunityService {
  private readonly apiUrl;

  constructor(private http: HttpClient, private configService:ConfigService) {
    this.apiUrl = this.configService.getApiUrl() + '/opportunities';
  }

  create(request: OpportunityRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}`, request, {
      responseType: 'text' as 'json',
    });
  }

  update(id: number, request: OpportunityRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, request, {
      responseType: 'text' as 'json',
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text' as 'json',
    });
  }

  getOpportunity(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getOpportunities(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  completeOpportunityWithWon(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/won`, {
      responseType: 'text' as 'json',
    });
  }

  completeOpportunityWithLost(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/lost`, {
      responseType: 'text' as 'json',
    });
  }

  // -- -- -- -- QUERIED LISTS -- -- -- //

  // Value Orders
  getOpportunitiesByValueOrderAsc(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/value-asc`);
  }

  getOpportunitiesByValueOrderDesc(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/value-desc`);
  }

  // Date Orders
  getOpportunitiesByDateOrderAsc(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/date-asc`);
  }

  getOpportunitiesByDateOrderDesc(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/date-desc`);
  }

  // Search
  getOpportunityBySearch(search: string): Observable<any> {
    const params = new HttpParams().set('search', search);

    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }

  // stats //
  //---------
  // Şirket başına fırsat sayısını getiren metod
  getOpportunitiesByCompany(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats/by-company`);
  }

  // Açık fırsatların sayısını getiren metod
  getOpenOpportunitiesCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/stats/open`);
  }

  // Kazanılmış fırsatların sayısını getiren metod
  getWonOpportunitiesCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/stats/won`);
  }

  // Kaybedilmiş fırsatların sayısını getiren metod
  getLostOpportunitiesCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/stats/lost`);
  }

  // En fazla fırsat getiren müşteri bilgisini getiren metod
  getTopCustomerByOpportunities(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats/top-customer`);
  }
}
