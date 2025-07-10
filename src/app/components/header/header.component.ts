// src/app/components/header/header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar navbar-dark bg-primary px-3">
      <a class="navbar-brand" href="#">
        <img src="assets/logo.png" alt="Logo" width="30" height="30" class="d-inline-block align-top me-2" />
        Task Management App
      </a>
    </nav>
  `,
  styles: [
    `
      nav {
        height: 56px;
      }
    `
  ]
})
export class HeaderComponent {}
