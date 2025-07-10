// src/app/components/task-filter/task-filter.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Priority, Status } from '../../models/task.model';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss']
})
export class TaskFilterComponent {
  @Output() filterChange = new EventEmitter<{ status?: Status; priority?: Priority; search?: string }>();

  statuses: Status[] = ['To Do', 'In Progress', 'Completed'];
  priorities: Priority[] = ['Low', 'Medium', 'High'];

  filter = {
    status: '',
    priority: '',
    search: ''
  };

  onFilterChange() {
    this.filterChange.emit({
      status: this.filter.status || undefined,
      priority: this.filter.priority || undefined,
      search: this.filter.search.trim() || undefined
    });
  }

  onClear() {
    this.filter = { status: '', priority: '', search: '' };
    this.onFilterChange();
  }
}
