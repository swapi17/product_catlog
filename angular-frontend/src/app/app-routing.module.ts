import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from './products/products.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { CommonModule } from '@angular/common';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ProductViewComponent } from './products/product-view/product-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'category', pathMatch: 'full'},
  { path: 'category', component: CategoryComponent },
  { path: 'category/create', component: CreateCategoryComponent },
  { path: 'category/edit/:categoryId', component: EditCategoryComponent },
  { path: 'products', component: ProductsComponent},
   { path: 'products/:categoryId/:categoryName', component: ProductsComponent},
  { path: 'products/create', component: CreateProductComponent },
  { path: 'product/:categoryId/edit/:productId', component: EditProductComponent },
   { path: 'product/:categoryId/view/:productId', component: ProductViewComponent }
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }