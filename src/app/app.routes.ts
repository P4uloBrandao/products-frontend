import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {ListProductsComponent} from "./components/list-products/list-products.component";
import {authGuard} from "./guards/auth/auth.guard";
import {ProductComponent} from "./components/product/product.component";
import {adminGuard} from "./guards/admin/admin.guard";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ListProductsComponent, canActivate: [authGuard] },
  { path: 'product/:idProduct', component: ProductComponent, canActivate: [authGuard, adminGuard] }, // Nova rota adicionada
  { path: 'product', component: ProductComponent, canActivate: [authGuard, adminGuard] }, // Nova rota adicionada
  {path: '**', redirectTo: ''}
];
