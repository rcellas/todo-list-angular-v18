import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../shared/model/Task';
import { TaskService } from '../shared/services/task.service';
import { FormComponent } from "./components/form/form.component";
import { ListComponent } from "./components/list/list.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [FormComponent, ReactiveFormsModule, ListComponent],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  private taskService = inject(TaskService);
  private formBuilder = inject(FormBuilder);
  tasks!: Task[];
  taskForm!: FormGroup;

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      nameTask: [''],
      file: [null],
      isComplete: [false]
    });
    this.taskService.getAllTasks().subscribe((result) => this.tasks = result);
  }

  onSubmit(formData: FormData) {
    this.taskService.addTask(formData).then(() => {
      this.taskForm.reset();
      this.taskService.getAllTasks().subscribe((result) => this.tasks = result);
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task);
  }

  toggleTask(task: Task) {
    task.isComplete = !task.isComplete;
    this.taskService.updateTask(task);
  }
}
