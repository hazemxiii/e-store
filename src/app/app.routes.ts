import { Routes } from '@angular/router';
import { App } from './app';
import { Home } from './components/home/home';
import { AddProduct } from './components/add-product/add-product';
import { Main } from './components/main/main';
import { ProductDetails } from './components/product-details/product-details';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { RoleGuard } from './services/role-guard';

export const routes: Routes = [
  {
    path: '',
    component: Main,
    children: [
      { path: '', component: Home },
      {
        path: 'add_product/:id',
        component: AddProduct,
        canActivate: [RoleGuard],
        data: { role: 'admin' },
      },
      { path: 'product-details/:id', component: ProductDetails },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ],
  },
  { path: '**', component: Error },
];
