import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsData } from '../../services/products-data';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CustomBtn } from '../../custom-btn/custom-btn';

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
    private productsData: ProductsData,
    private route: ActivatedRoute,
    private router: Router,
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
}
