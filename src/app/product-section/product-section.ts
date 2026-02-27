import { Component, Output, ChangeDetectorRef } from '@angular/core';
import { Product } from '../models/product';
import { ProductCard } from '../product-card/product-card';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { AddProductCard } from '../components/add-product-card/add-product-card';
import { ProductsData } from '../services/products-data';
import { AuthService } from '../services/auth-service';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'product-section',
  imports: [ProductCard, FormsModule, CurrencyPipe, AddProductCard, NgStyle],
  templateUrl: './product-section.html',
  standalone: true,
  styleUrl: './product-section.css',
})
export class ProductSection {
  categories: string[] = [];
  products: Product[] = [];
  filtered: Product[] = [];
  // cart: Map<Product, number>;
  // totalPrice: number;
  constructor(
    public productsData: ProductsData,
    private cd: ChangeDetectorRef,
    public auth: AuthService,
  ) {
    // this.totalPrice = 0;
    // this.cart = new Map();
    // this.products = productsData.getData();
    // this.filtered = [...this.products];
    // this.categories = [];
    // for (let p of this.products) {
    //   if (!this.categories.includes(p.categoryName)) {
    //     this.categories.push(p.categoryName);
    //   }
    // }
  }
  ngOnInit(): void {
    this.productsData.getData().subscribe((data) => {
      for (let p of data) {
        this.products.push(
          new Product(
            p.id,
            p.name,
            p.categoryName,
            p.description,
            +p.price,
            +p.quantityLeft,
            +p.rating,
            p.imageUrl,
          ),
        );
        if (!this.categories.includes(p.categoryName)) {
          this.categories.push(p.categoryName);
        }
      }
      // this.products = data;
      this.filtered = [...this.products];
      // this.categories = [];
      // console.log(this.products);
      this.cd.detectChanges();
    });
  }

  getTheme() {
    return localStorage.getItem('theme') ?? 'light';
  }

  filterProducts(searchName: string, category: string, priceRange: string[]) {
    this.filtered = [];
    for (let p of this.products) {
      if (!p.name.toLowerCase().includes(searchName)) {
        continue;
      }
      if (p.categoryName != category && category != 'All') {
        continue;
      }
      console.log(priceRange);
      if (priceRange[0] != '' && p.price < +priceRange[0]) {
        continue;
      }
      if (priceRange[1] != '' && p.price > +priceRange[1]) {
        continue;
      }
      this.filtered.push(p);
    }
    // this.filtered = this.products.filter((pr) => pr.name.toLowerCase().includes(searchName));
  }

  // increaseQty(product: Product): undefined {
  //   if (!this.cart.has(product)) {
  //     this.cart.set(product, 0);
  //   }
  //   if (this.cart.get(product)! < product.quantityLeft) {
  //     this.totalPrice += product.price;
  //     this.cart.set(product, this.cart.get(product)! + 1);
  //   }
  // }
  // decreaseQty(product: Product): undefined {
  //   if (!this.cart.has(product)) {
  //     this.cart.set(product, 0);
  //   }
  //   if (this.cart.get(product)! > 0) {
  //     this.totalPrice -= product.price;
  //     this.cart.set(product, this.cart.get(product)! - 1);
  //   }
  // }
  // buyProduct(product: Product): undefined {
  //   if (this.cart.has(product)) {
  //     product.reduceStock(this.cart.get(product)!);
  //     this.totalPrice -= this.cart.get(product)! * product.price;
  //     this.cart.delete(product);
  //   }
  // }
  // getProductQty(product: Product): number {
  //   return this.cart.get(product) ?? 0;
  // }
  // setProductQty(product: Product, qty: number): undefined {
  //   let old: number = this.cart.get(product) ?? 0;
  //   let newV: number = 0;
  //   if (qty > 0 && qty <= product.quantityLeft) {
  //     newV = qty;
  //   } else if (qty > product.quantityLeft) {
  //     newV = product.quantityLeft;
  //   }
  //   this.cart.set(product, newV);
  //   this.totalPrice += (newV - old) * product.price;
  // }
  // filterByCategory(category: string): undefined {
  //   for(category)
  // }
}
