import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Product } from './products/products.model';
import { Category } from './category/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService {
  
  products: Product[] = [];

  constructor(private webReqService: WebRequestService) { }


  getAllCategories() {
    return this.webReqService.get('category');
  }

  createCategory(name:string,description:string) {
    // We want to send a web request to create a category
    return this.webReqService.post('category/create', {name,description});
  }

  updateCategory(id: string, category: Category) {
    // We want to send a web request to update a category
    return this.webReqService.patch(`category/${id}`, category);
  }

  updateProduct(categoryId: string, productId: string, name:string,description:string,price:string) {
    // We want to send a web request to update a list
    return this.webReqService.patch(`category/${categoryId}/products/${productId}`, {name,description,price});
  }

  deleteProduct(productId: string) {
    return this.webReqService.delete(`products/${productId}`);
  }

  deleteCategory(id: string) {
    return this.webReqService.delete(`category/${id}`);
  }
  
  getProductsByCategory(categoryId: string){
    return this.webReqService.get(`category/${categoryId}/products`);
  }
  getAllProducts() {
     return this.webReqService.get('products');
  }
  
  getProductById(id: string){
    return this.webReqService.get(`products/${id}`);
  }
  createProduct(name:string,category:string,description:string,price:string) {
    // We want to send a web request to create a product
    return this.webReqService.post(`category/product/create`, {name,category,description,price});
  }

}
