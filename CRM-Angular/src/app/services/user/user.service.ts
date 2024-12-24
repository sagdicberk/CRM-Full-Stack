import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateUserRequest } from '../../dto/user/update-user-request';
import { Observable } from 'rxjs';
import {ConfigService} from "../../config/config.service";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl ;

  constructor(private http: HttpClient, private configService:ConfigService) {
    this.apiUrl = this.configService.getApiUrl()+'/user';
  }

  updateUser(request: UpdateUserRequest, id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, request, {
      responseType: 'text' as 'json',
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      responseType: 'text' as 'json',
    });
  }

  // ToDo Dto hazırlanacak bakcend için de
  getUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/current`);
  }

  getAllUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`);
  }

  searchUser(searchTerm: string): Observable<any> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }

  getRoles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/roles`);
  }
}
