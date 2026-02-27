import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductsData } from '../../services/products-data';
import { Product } from '../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  product = new Product(0, '', '', '', 0, 0, 0, '');
  constructor(
    private productsData: ProductsData,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    let product: Product | undefined = this.productsData.getProductByID(
      +(this.route.snapshot.paramMap.get('id') ?? '0'),
    );
    if (product) {
      this.product = product;
    }
  }
  onSubmit(form: NgForm) {
    if (this.product.id == 0) {
      // this.product.id = this.productsData.getData().length + 1;
      this.productsData.getData().subscribe((data) => {
        this.product.id = data.length + 1;
        this.productsData.addProduct(this.product);
      });
    } else {
      this.productsData.updateProduct(this.product);
    }
    this.router.navigate(['']);
  }
}
