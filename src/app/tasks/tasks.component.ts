import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../shared/model/Task';
import { TaskService } from '../shared/services/task.service';
import { FormComponent } from "./components/form/form.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [FormComponent, ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit{
  private taskService = inject(TaskService);
  private formBuilder =inject(FormBuilder);
  taskForm!: FormGroup;

  newTask:Task={nameTask:'',isComplete:false}

  ngOnInit(): void {
      this.taskForm = this.formBuilder.group(this.newTask);
  }

  onSubmit(task:Task){
    this.taskService.addTask(task);
  }
}
