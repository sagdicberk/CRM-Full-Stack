import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { customer } from '../../dto/customer/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) {}

  createCustomer(request: customer): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, request, {
      responseType: 'text' as 'json',
    });
  }

  updateCustomer(id: number, request: customer): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, request, {
      responseType: 'text' as 'json',
    });
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text' as 'json',
    });
  }

  findCustomerById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  findCustomerByEmail(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.get(`${this.apiUrl}/search`, { params });
  }

  findAllCustomers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Toplam müşteri sayısını getiren servis
  getTotalCustomerCount(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/total-count`);
  }

  // Şirket başına müşteri sayısını getiren servis
  getCustomerCountByCompany(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/company-count`);
  }
}
