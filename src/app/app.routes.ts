import { Routes } from '@angular/router';
import { App } from './app';
import { Home } from './components/home/home';
import { AddProduct } from './components/add-product/add-product';
import { Main } from './components/main/main';
import { ProductDetails } from './components/product-details/product-details';

export const routes: Routes = [
  {
    path: '',
    component: Main,
    children: [
      { path: '', component: Home },
      { path: 'add_product/:id', component: AddProduct },
      { path: 'product-details/:id', component: ProductDetails },
    ],
  },
  { path: '**', component: Error },
];
