import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../shared/model/Task';
import { TaskService } from '../shared/services/task.service';
import { FormComponent } from "./components/form/form.component";
import { Observable } from 'rxjs';
import { ListComponent } from "./components/list/list.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [FormComponent, ReactiveFormsModule,ListComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit{
  private taskService = inject(TaskService);
  private formBuilder =inject(FormBuilder);
  tasks!:Task[];
  taskForm!: FormGroup;

  newTask:Task={nameTask:'',isComplete:false}

  ngOnInit(): void {
      this.taskForm = this.formBuilder.group(this.newTask);
      this.taskService.getAllTasks().subscribe((result)=>this.tasks = result);
  }

  onSubmit(task:Task){
    this.taskService.addTask(task);
  }

  toogleTask(task:Task){
    task.isComplete = !task.isComplete;
    this.taskService.updateTask(task);
  }
}
