import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardDirective } from '../card-directive';

@Component({
  selector: 'custom-btn',
  imports: [CardDirective],
  templateUrl: './custom-btn.html',
  styleUrl: './custom-btn.css',
})
export class CustomBtn {
  @Output() onClick = new EventEmitter<void>();
  @Input() title?: string;
  constructor() {
    this.title ??= 'Title';
  }
  onItemClick() {
    this.onClick.emit();
  }
}
