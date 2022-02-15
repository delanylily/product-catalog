import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './login/services/auth.service';
import { AuthGuard } from './auth-guard';
import { getAuth } from "firebase/auth";
import { HotToastModule } from '@ngneat/hot-toast';
import { environment } from 'src/environments/environment';
//import { AuthGuard, redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';
// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
// const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const auth = getAuth();
import { initializeApp } from "firebase/app";
import { UserService } from './services/user.service';
import { CategoryService } from './category.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { FormsModule } from '@angular/forms';
const app = initializeApp(environment.firebaseConfig);
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    SearchFilterComponent,
    SearchFilterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    NgbModule,
    RouterModule.forRoot([
      // { path: '', component: HomeComponent, ...canActivate(redirectUnauthorizedToLogin) },
      { path: '', component: HomeComponent },


      {
        path: 'products', component: ProductsComponent,
        children: [
          {
            path: 'new',
            component: ProductFormComponent
          }
        ]

      },

      // { path: 'new-product', component: ProductFormComponent, canActivate: [AuthGuard] },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },

      { path: 'check-out', component: CheckOutComponent },
      { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard] },
    ]),
    NgbModule,
    HotToastModule.forRoot(),

  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
