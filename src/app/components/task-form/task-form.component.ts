// src/app/components/task-form/task-form.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task, Priority, Status } from '../../models/task.model';
import { addTask, updateTask } from '../../store/tasks/tasks.actions';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input() taskToEdit?: Task | null;
  @Output() formClose = new EventEmitter<void>();

  form!: FormGroup;

  priorities: Priority[] = ['Low', 'Medium', 'High'];
  statuses: Status[] = ['To Do', 'In Progress', 'Completed'];

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.taskToEdit?.title || '', [Validators.required, Validators.maxLength(100)]],
      description: [this.taskToEdit?.description || '', [Validators.maxLength(500)]],
      priority: [this.taskToEdit?.priority || 'Medium', Validators.required],
      status: [this.taskToEdit?.status || 'To Do', Validators.required],
      dueDate: [this.taskToEdit ? this.taskToEdit.dueDate.substring(0,10) : '', [Validators.required, this.futureDateValidator]],
    });

    // Disable editing for completed tasks
    if (this.taskToEdit?.status === 'Completed') {
      this.form.disable();
    }
  }

  futureDateValidator(control: AbstractControl) {
    if (!control.value) return null;
    const today = new Date();
    const inputDate = new Date(control.value);
    return inputDate > today ? null : { notFuture: true };
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    if (this.taskToEdit) {
      // Update existing task
      const updatedTask: Task = {
        ...this.taskToEdit,
        ...formValue,
        dueDate: new Date(formValue.dueDate).toISOString(),
      };
      this.store.dispatch(updateTask({ task: updatedTask }));
    } else {
      // Create new task
      const newTask: Task = {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        dueDate: new Date(formValue.dueDate).toISOString(),
        ...formValue,
      };
      this.store.dispatch(addTask({ task: newTask }));
    }
    this.formClose.emit();
  }

  onCancel() {
    this.formClose.emit();
  }
}
