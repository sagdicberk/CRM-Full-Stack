import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { company } from '../../dto/company/company.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = 'http://localhost:8080/api/companies';

  constructor(private http: HttpClient) {}

  createCompany(request: company): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, request, {
      responseType: 'text' as 'json',
    });
  }

  updateCompany(id: number, request: company): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, request, {
      responseType: 'text' as 'json',
    });
  }

  deleteCompany(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text' as 'json',
    });
  }

  findCompanyById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  findCompanyByName(name: string): Observable<any> {
    // Use URLSearchParams to properly append the query parameter
    const params = new HttpParams().set('name', name);
    return this.http.get(`${this.apiUrl}/search`, { params });
  }

  findAllCompanies(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // -- tablo sayfası için
  getCompanyCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}
