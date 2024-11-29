import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../dto/auth/login-request';
import { RegisterRequest } from '../dto/auth/register-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, request, {
      responseType: 'text' as 'json',
    });
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, request, {
      responseType: 'text' as 'json',
    });
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  isAdmin(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/admin`);
  }
}
