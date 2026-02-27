import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Theme {
  theme = signal<'light' | 'dark'>('light');

  toggleTheme() {
    this.theme.set(this.theme() === 'light' ? 'dark' : 'light');
  }
}
