import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Product} from './products.model';

import { from } from 'rxjs';
import { CategoryProductService } from '../category-product.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  products: Product[] = [
    new Product("AC","Electronics","Temperature conditioning","278")
    ,new Product("T-shirt","Fashion","Branded Nike sportswaer","900"),
    new Product("Vinegar","Food","Healthy food items","654"),
    new Product("Death-Book","Books","Spiritual book","5600")
    ,new Product("Tiffin","Kitchen","Kithen utensiles","643"),new Product("Mi Phone","Mobile Phones","Discounted Mobile phones","465")];

  selectedCategoryId: string;
  categoryName: string;
  constructor(private categoryProductService:CategoryProductService,private route: ActivatedRoute,private router: Router) {
    console.log("contructor init");
   }

   ngOnInit() {
     console.log("product init");
     this.route.params.subscribe(
      (params: Params) => {
        if (params.categoryId) {
          console.log("Specific category");
          this.selectedCategoryId = params.categoryId;
          this.categoryName = params.categoryName;
          this.categoryProductService.getProductsByCategory(params.categoryId).subscribe((products: Product[]) => {
            this.products = products;
          })
        } else {
         console.log("All categories");
         this.categoryName = "All";
         this.categoryProductService.getAllProducts().subscribe((products: Product[]) => {
        this.products = products;
        console.log(products);
         
   });
        }
      }
    )
    
    

   }
  
  
  onEdit(){
    this.router.navigate(['/products/create']);
  }

  deleteProduct(productId: string){
   
    this.categoryProductService.deleteProduct(productId).subscribe((res: any) => {
        
        console.log(res);
        this.router.navigate(['/products',this.selectedCategoryId]);
         
   });
  }
  

}