import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardDirective } from '../card-directive';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'custom-btn',
  imports: [NgStyle],
  templateUrl: './custom-btn.html',
  styleUrl: './custom-btn.css',
})
export class CustomBtn {
  @Input() onClick!: () => void;
  @Input() title?: string;
  @Input() color?: string;
  constructor() {
    this.title ??= 'Title';
    this.color ??= 'black';
  }
  onItemClick() {
    this.onClick();
  }
}
