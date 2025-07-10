// src/app/components/task-list/task-list.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { deleteTask } from '../../store/tasks/tasks.actions';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Optional bootstrap modal

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() editTask = new EventEmitter<Task>();

  constructor(private store: Store, private modalService: NgbModal) {}

  priorityOrder: Record<string, number> = { 'High': 3, 'Medium': 2, 'Low': 1 };

  sortedTasks(): Task[] {
    return [...this.tasks].sort((a, b) => {
      const prioDiff = this.priorityOrder[b.priority] - this.priorityOrder[a.priority];
      if (prioDiff !== 0) return prioDiff;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }

  isOverdue(task: Task): boolean {
    return new Date(task.dueDate) < new Date() && task.status !== 'Completed';
  }

  onEdit(task: Task) {
    this.editTask.emit(task);
  }

  onDelete(task: Task) {
    if (task.status === 'Completed') return;

    const modalRef = this.modalService.open(ConfirmDialogComponent);
    modalRef.componentInstance.message = `Are you sure you want to delete task "${task.title}"?`;

    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          this.store.dispatch(deleteTask({ id: task.id }));
        }
      },
      () => {}
    );
  }
}
