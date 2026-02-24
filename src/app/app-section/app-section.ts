import { Component, Input } from '@angular/core';
import { SectionTitle } from '../section-title/section-title';

@Component({
  selector: 'app-section',
  imports: [SectionTitle],
  templateUrl: './app-section.html',
  styleUrl: './app-section.css',
})
export class AppSection {
  @Input() title?: string;
  @Input() subtitle?: string;
}
