import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  thumbnail: string;
}

interface Cart {
  id: number;
  discountedTotal: number;
  total: number;
  totalProducts: number;
  totalQuantity: number;
  userId: number;
  products: Product[];
}

interface ApiResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

@Component({
  selector: 'app-img-slider',
  templateUrl: './img-slider.html',
  styleUrls: ['./img-slider.css'],
  standalone: true,
})
export class ImgSlider {
  images: string[] = [
    'https://cdn.dummyjson.com/products/images/vehicle/Charger%20SXT%20RWD/thumbnail.png',
    'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png',
    'https://cdn.dummyjson.com/products/images/womens-jewellery/Green%20Oval%20Earring/thumbnail.png',
  ];

  constructor() {}
}
