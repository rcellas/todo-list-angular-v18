import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../../shared/model/Task';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() taskForm!: FormGroup;
  @Output() sentForm = new EventEmitter<FormData>();
  selectedFile!: File | null;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('nameTask', this.taskForm.get('nameTask')?.value || '');
    formData.append('isComplete', this.taskForm.get('isComplete')?.value || false);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    console.log('Form submitted:', formData); // Añadir esta línea para depuración
    this.sentForm.emit(formData);
  }
}
