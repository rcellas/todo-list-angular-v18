import { computed, inject, Injectable, signal } from '@angular/core';
import { Task } from '../model/Task';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, firstValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = environment.API_URL;
  tasks = signal<Task[]>([]);
  http = inject(HttpClient);

  getAllTasks(){
    return this.http.get<Task[]>(this.url);
  }

  async addTask(task:Task){
    try{
      const result = await firstValueFrom(this.http.post<Task>(this.url, task).pipe(catchError(e=>of(e))));
      return result;
    }catch(e){
      console.error(e);
    }
  }

  async updateTask(task:Task){
    try{
      const result = await firstValueFrom(this.http.put<Task>(`${this.url}${task.id}`,task).pipe(catchError(e=>of(e))));
      return result;
    }
    catch(e){
      console.error(e)
    }
  }


}
