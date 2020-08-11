import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CategoryComponent } from './category/category.component';
import { HeaderComponent } from './header/header.component';

import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CreateProductComponent } from './products/create-product/create-product.component';

import { ProductsComponent } from './products/products.component';
import { CategoryProductService } from './category-product.service';
import { WebRequestService } from './web-request.service';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ProductViewComponent } from './products/product-view/product-view.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, HttpClientModule ],
  declarations: [ AppComponent, HelloComponent, CategoryComponent, HeaderComponent,ProductsComponent, CreateCategoryComponent, CreateProductComponent, EditCategoryComponent, EditProductComponent, ProductViewComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ CategoryProductService, WebRequestService],
  exports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ]
})
export class AppModule { }
