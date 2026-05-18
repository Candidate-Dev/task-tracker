import { inject, Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private httpClient = inject(HttpClient);
  
  getTasks(): Observable<{ tasks: Task[] }> {
    return this.httpClient.get<{ tasks: Task[] }>('http://localhost:3000/task');
  }

  createTask(task: Task): Observable<{ message: string }>{
    return this.httpClient.post<{ message: string }>('http://localhost:3000/task', task);
  }

  removeTask(id: number): Observable<{ message: string }>{
    return this.httpClient.delete<{ message: string }>(`http://localhost:3000/task/${id}`);
  }

  updateStatus(id: number, status: string): Observable<{ message: string }>{
    return this.httpClient.patch<{ message: string }>(`http://localhost:3000/task/${id}`, {status: status});
  }
}
