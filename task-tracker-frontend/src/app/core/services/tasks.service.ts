import { inject, Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private httpClient = inject(HttpClient);
  
  getTasks(): Observable<{ tasks: Task[] }> {
    return this.httpClient.get<{ tasks: Task[] }>(`${environment.apiUrl}/task`);
  }

  createTask(task: Task): Observable<{ message: string }>{
    return this.httpClient.post<{ message: string }>(`${environment.apiUrl}/task`, task);
  }

  removeTask(id: number): Observable<{ message: string }>{
    return this.httpClient.delete<{ message: string }>(`${environment.apiUrl}/task/${id}`);
  }

  updateStatus(id: number, status: string): Observable<{ message: string }>{
    return this.httpClient.patch<{ message: string }>(`${environment.apiUrl}/task/${id}`, {status: status});
  }
}
