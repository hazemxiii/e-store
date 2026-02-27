import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/product';
import { CurrencyPipe } from '@angular/common';
import { CardDirective } from '../card-directive';
import { ShortTextPipePipe } from '../short-text-pipe-pipe';
import { ZoomDirective } from '../zoom-directive';
import { CustomBtn } from '../custom-btn/custom-btn';
import { Router } from '@angular/router';
import { ProductsData } from '../services/products-data';
import { AuthService } from '../services/auth-service';
@Component({
  selector: 'product-card',
  imports: [CurrencyPipe, CardDirective, ShortTextPipePipe, ZoomDirective, CustomBtn],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: Product;
  @Input() increaseQty!: (product: Product) => void;
  @Input() decreaseQty!: (product: Product) => void;
  @Input() buyProduct!: (product: Product) => void;
  @Input() getProductQty!: (product: Product) => number;
  @Input() setProductQty!: (product: Product, qty: number) => void;
  expanded: boolean;

  constructor(
    private router: Router,
    public productsData: ProductsData,
    public auth: AuthService,
  ) {
    this.expanded = false;
    this.product ??= new Product(0, 'Name', 'Category', 'Description', 0, 0, 0, '');
  }

  goToDetails() {
    this.router.navigate(['/product-details', this.product.id]);
  }
  goToEdit() {
    this.router.navigate(['/add_product', this.product.id]);
  }

  expandDescription() {
    this.expanded = !this.expanded;
  }
  // _increaseQty() {
  //   this.increaseQty(this.product);
  // }
  // _decreaseQty() {
  //   this.decreaseQty(this.product);
  // }
  _buyProduct() {
    this.productsData.buyProduct(this.product);
  }
  // _getProductQuantity(): number {
  //   return this.getProductQty(this.product);
  // }
  onQtyInput(qty: number) {
    // this.setProductQty(this.product, qty);
    this.productsData.setProductQty(this.product, qty);
  }
}
