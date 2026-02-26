import { Component, Output } from '@angular/core';
import { Product } from '../models/product';
import { ProductCard } from '../product-card/product-card';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { AddProductCard } from '../components/add-product-card/add-product-card';
import { ProductsData } from '../services/products-data';
@Component({
  selector: 'product-section',
  imports: [ProductCard, FormsModule, CurrencyPipe, AddProductCard],
  templateUrl: './product-section.html',
  standalone: true,
  styleUrl: './product-section.css',
})
export class ProductSection {
  categories: string[];
  filteredBeforeCat: Product[] = [];
  products: Product[];
  filtered: Product[];
  cart: Map<Product, number>;
  totalPrice: number;
  constructor(private productsData: ProductsData) {
    this.totalPrice = 0;
    this.cart = new Map();
    // this.products = [
    //   new Product(
    //     1,
    //     'Wireless Mouse',
    //     'Electronics',
    //     'Ergonomic wireless mouse with USB receiver',
    //     29.99,
    //     2,
    //     4.5,
    //     'https://example.com/images/mouse.jpg',
    //   ),
    //   new Product(
    //     2,
    //     'Mechanical Keyboard',
    //     'Electronics',
    //     'RGB backlit mechanical keyboard with blue switches',
    //     79.99,
    //     30,
    //     4.7,
    //     'https://example.com/images/keyboard.jpg',
    //   ),
    //   new Product(
    //     3,
    //     'Gaming Headset',
    //     'Electronics',
    //     'Surround sound gaming headset with noise-canceling mic',
    //     59.99,
    //     25,
    //     4.4,
    //     'https://example.com/images/headset.jpg',
    //   ),
    //   new Product(
    //     4,
    //     'Smart Watch',
    //     'Wearables',
    //     'Fitness tracking smart watch with heart rate monitor',
    //     129.99,
    //     15,
    //     4.3,
    //     'https://example.com/images/smartwatch.jpg',
    //   ),
    //   new Product(
    //     5,
    //     'Bluetooth Speaker',
    //     'Audio',
    //     'Portable waterproof Bluetooth speaker',
    //     45.99,
    //     40,
    //     4.6,
    //     'https://example.com/images/speaker.jpg',
    //   ),
    //   new Product(
    //     6,
    //     'Laptop Stand',
    //     'Accessories',
    //     'Adjustable aluminum laptop stand for desks',
    //     34.99,
    //     60,
    //     4.5,
    //     'https://example.com/images/laptop-stand.jpg',
    //   ),
    //   new Product(
    //     7,
    //     'USB-C Hub',
    //     'Accessories',
    //     'Multi-port USB-C hub with HDMI and USB 3.0',
    //     39.99,
    //     35,
    //     4.2,
    //     'https://example.com/images/usb-hub.jpg',
    //   ),
    //   new Product(
    //     8,
    //     'External SSD 1TB',
    //     'Storage',
    //     'High-speed portable external SSD 1TB',
    //     149.99,
    //     20,
    //     4.8,
    //     'https://example.com/images/ssd.jpg',
    //   ),
    //   new Product(
    //     9,
    //     '4K Monitor',
    //     'Electronics',
    //     '27-inch 4K UHD monitor with HDR support',
    //     329.99,
    //     10,
    //     4.7,
    //     'https://example.com/images/monitor.jpg',
    //   ),
    //   new Product(
    //     10,
    //     'Webcam HD',
    //     'Electronics',
    //     '1080p HD webcam with built-in microphone',
    //     49.99,
    //     45,
    //     4.3,
    //     'https://example.com/images/webcam.jpg',
    //   ),
    // ];
    this.products = productsData.getData();
    this.filtered = [...this.products];
    this.categories = [];
    for (let p of this.products) {
      if (!this.categories.includes(p.categoryName)) {
        this.categories.push(p.categoryName);
      }
    }
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

  increaseQty(product: Product): undefined {
    if (!this.cart.has(product)) {
      this.cart.set(product, 0);
    }
    if (this.cart.get(product)! < product.quantityLeft) {
      this.totalPrice += product.price;
      this.cart.set(product, this.cart.get(product)! + 1);
    }
  }
  decreaseQty(product: Product): undefined {
    if (!this.cart.has(product)) {
      this.cart.set(product, 0);
    }
    if (this.cart.get(product)! > 0) {
      this.totalPrice -= product.price;
      this.cart.set(product, this.cart.get(product)! - 1);
    }
  }
  buyProduct(product: Product): undefined {
    if (this.cart.has(product)) {
      product.reduceStock(this.cart.get(product)!);
      this.totalPrice -= this.cart.get(product)! * product.price;
      this.cart.delete(product);
    }
  }
  getProductQty(product: Product): number {
    return this.cart.get(product) ?? 0;
  }
  setProductQty(product: Product, qty: number): undefined {
    let old: number = this.cart.get(product) ?? 0;
    let newV: number = 0;
    if (qty > 0 && qty <= product.quantityLeft) {
      newV = qty;
    } else if (qty > product.quantityLeft) {
      newV = product.quantityLeft;
    }
    this.cart.set(product, newV);
    this.totalPrice += (newV - old) * product.price;
  }
  // filterByCategory(category: string): undefined {
  //   for(category)
  // }
}
