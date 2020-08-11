import { Component, OnInit } from '@angular/core';
import { Category } from './category.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CategoryProductService } from '../category-product.service';
import { Product } from '../products/products.model';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  categories: Category[] = [
    new Category("Electronics","Home appliances for use")
    ,new Category("Fashion","Branded clothes"),
    new Category("Food","Healthy food items"),
    new Category("Books","Understanding of the books")
    ,new Category("Kitchen","Kithen utensiles"),new Category("Mobile Phones","Discounted Mobile phones")];
  
  //selectedCategoryId: string;


  constructor(private categoryProductService:CategoryProductService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
    
    console.log("Category array loaded!")
    this.categoryProductService.getAllCategories().subscribe((categories: Category[]) => {
        this.categories = categories;
        console.log(categories);
         
   });
  }
  
 
  
  deleteCategory(selectedCategoryId:string){
    console.log("category deleted");
    this.categoryProductService.deleteCategory(selectedCategoryId).subscribe((res: any) => {
        
        console.log(res);
        this.router.navigate(['/category']);
         
   });
  }
  

 
  
}