import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsData } from '../../services/products-data';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CustomBtn } from '../../custom-btn/custom-btn';
import { AuthService } from '../../services/auth-service';
@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, CustomBtn],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
  standalone: true,
})
export class ProductDetails {
  product!: Product;
  constructor(
    public productsData: ProductsData,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
  ) {}
  ngOnInit() {
    let product: Product | undefined = this.productsData.getProductByID(
      +(this.route.snapshot.paramMap.get('id') ?? '0'),
    );
    if (product == undefined) {
      this.router.navigate(['']);
    } else {
      this.product = product;
    }
  }

  deleteProduct() {
    this.productsData.deleteProduct(this.product);
    this.router.navigate(['']);
  }

  _increaseQty() {
    this.productsData.increaseQty(this.product);
  }

  _decreaseQty() {
    this.productsData.decreaseQty(this.product);
  }

  _buyProduct() {
    this.productsData.buyProduct(this.product);
  }

  onQtyInput(qty: number) {
    this.productsData.setProductQty(this.product, qty);
  }

  goToEdit() {
    this.router.navigate(['/add_product', this.product.id]);
  }
}
