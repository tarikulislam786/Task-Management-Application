// src/app/components/confirm-dialog/confirm-dialog.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Confirm</h5>
      <button type="button" class="btn-close" aria-label="Close" (click)="cancel()"></button>
    </div>
    <div class="modal-body">
      <p>{{ message }}</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" (click)="cancel()">Cancel</button>
      <button class="btn btn-danger" (click)="confirm()">Delete</button>
    </div>
  `,
  styles: []
})
export class ConfirmDialogComponent {
  @Input() message = 'Are you sure?';
  @Output() confirmed = new EventEmitter<boolean>();

  confirm() {
    this.confirmed.emit(true);
  }
  cancel() {
    this.confirmed.emit(false);
  }
}
