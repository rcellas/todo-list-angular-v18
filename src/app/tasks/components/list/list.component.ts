import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { Task } from '../../../shared/model/Task';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input() tasks!:Task[];
  @Output() sentTask = new EventEmitter<Task>();

  trackTasks(index:number, task:Task){
    return task.id;
  }

  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleTask: EventEmitter<Task> = new EventEmitter();

  onDelete(task:Task):void{
     this.onDeleteTask.emit(task)
  }

  onToggle(task:Task):void{
     this.onToggleTask.emit(task)
  }
}
