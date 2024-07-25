import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../../shared/model/Task';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() taskForm!: FormGroup;
  @Output() sentForm= new EventEmitter<Task>();

  onSubmit(){
    const task:Task={
      nameTask:this.taskForm.controls["nameTask"].value,
      isComplete:this.taskForm.controls["isComplete"].value
    }
    this.sentForm.emit(task);
  }
}
