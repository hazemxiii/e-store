import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { CurrencyPipe } from '@angular/common';
import { CardDirective } from '../card-directive';
import { ShortTextPipePipe } from '../short-text-pipe-pipe';
import { ZoomDirective } from '../zoom-directive';
import { CustomBtn } from '../custom-btn/custom-btn';

@Component({
  selector: 'product-card',
  imports: [CurrencyPipe, CardDirective, ShortTextPipePipe, ZoomDirective, CustomBtn],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: Product;
  expanded: boolean;

  constructor() {
    this.expanded = false;
    this.product ??= new Product(0, 'Name', 'Category', 'Description', 0, 0, 0, '');
  }

  expandDescription() {
    this.expanded = !this.expanded;
  }

  buy() {
    console.log('buying ' + this.product.name);
  }
}
