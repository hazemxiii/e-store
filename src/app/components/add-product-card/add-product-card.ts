import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsData } from '../../services/products-data';

@Component({
  selector: 'app-add-product-card',
  imports: [RouterLink],
  templateUrl: './add-product-card.html',
  styleUrl: './add-product-card.css',
})
export class AddProductCard {
  constructor(private productsData: ProductsData) {}
}
