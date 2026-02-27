import { Component, Input } from '@angular/core';
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
  @Input() icon?: string;
  constructor() {
    this.title ??= 'Title';
    this.color ??= 'black';
    this.icon ??= '';
  }
  onItemClick() {
    this.onClick();
  }
}
