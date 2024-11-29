import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskRequest } from '../../dto/task/task.request';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getTask(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createTask(task: TaskRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}`, task, {
      responseType: 'text' as 'json',
    });
  }

  updateTask(id: number, task: TaskRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task, {
      responseType: 'text' as 'json',
    });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text' as 'json',
    });
  }

  startTask(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/start`, {});
  }

  completeTask(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/complete`, {});
  }

  cancelTask(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/cancel`, {});
  }

  getTasksByUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-tasks-by-user`);
  }
}
