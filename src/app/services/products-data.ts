import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsData {
  private products = [
    new Product(
      1,
      'Wireless Mouse',
      'Electronics',
      'Ergonomic wireless mouse with USB receiver',
      29.99,
      2,
      4.5,
      'https://example.com/images/mouse.jpg',
    ),
    new Product(
      2,
      'Mechanical Keyboard',
      'Electronics',
      'RGB backlit mechanical keyboard with blue switches',
      79.99,
      30,
      4.7,
      'https://example.com/images/keyboard.jpg',
    ),
    new Product(
      3,
      'Gaming Headset',
      'Electronics',
      'Surround sound gaming headset with noise-canceling mic',
      59.99,
      25,
      4.4,
      'https://example.com/images/headset.jpg',
    ),
    new Product(
      4,
      'Smart Watch',
      'Wearables',
      'Fitness tracking smart watch with heart rate monitor',
      129.99,
      15,
      4.3,
      'https://example.com/images/smartwatch.jpg',
    ),
    new Product(
      5,
      'Bluetooth Speaker',
      'Audio',
      'Portable waterproof Bluetooth speaker',
      45.99,
      40,
      4.6,
      'https://example.com/images/speaker.jpg',
    ),
    new Product(
      6,
      'Laptop Stand',
      'Accessories',
      'Adjustable aluminum laptop stand for desks',
      34.99,
      60,
      4.5,
      'https://example.com/images/laptop-stand.jpg',
    ),
    new Product(
      7,
      'USB-C Hub',
      'Accessories',
      'Multi-port USB-C hub with HDMI and USB 3.0',
      39.99,
      35,
      4.2,
      'https://example.com/images/usb-hub.jpg',
    ),
    new Product(
      8,
      'External SSD 1TB',
      'Storage',
      'High-speed portable external SSD 1TB',
      149.99,
      20,
      4.8,
      'https://example.com/images/ssd.jpg',
    ),
    new Product(
      9,
      '4K Monitor',
      'Electronics',
      '27-inch 4K UHD monitor with HDR support',
      329.99,
      10,
      4.7,
      'https://example.com/images/monitor.jpg',
    ),
    new Product(
      10,
      'Webcam HD',
      'Electronics',
      '1080p HD webcam with built-in microphone',
      49.99,
      45,
      4.3,
      'https://example.com/images/webcam.jpg',
    ),
  ];
  private totalPrice: number;
  private url: string = 'http://localhost:3000';
  private productsURL: string = this.url + '/products';
  private cart: Map<Product, number>;
  constructor(private http: HttpClient) {
    this.cart = new Map();
    this.totalPrice = 0;
  }

  getCart(): Map<Product, number> {
    return this.cart;
  }
  getTotalPrice(): number {
    return this.totalPrice;
  }

  getData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsURL);
  }
  // getData(): Product[] {
  //   return this.products;
  // }
  getProductByID(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }
  deleteProduct(pr: Product) {
    this.products = this.products
      .slice(0, this.products.indexOf(pr))
      .concat(this.products.slice(this.products.indexOf(pr) + 1));
  }
  addProduct(pr: Product) {
    // this.products.push(pr);
    this.http.post(this.productsURL, pr).subscribe((data) => {
      // console.log(data);
    });
    // console.log(pr);
  }
  updateProduct(pr: Product) {
    // this.products[this.products.indexOf(pr)] = pr;
    this.http.put(this.productsURL + '/' + pr.id, pr).subscribe((data) => {
      // console.log(data);
    });
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
      this.http.put(this.productsURL + '/' + product.id, product).subscribe((data) => {
        // console.log(data);
      });
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
}
