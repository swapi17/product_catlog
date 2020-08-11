import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Product } from '../products.model';
import { HttpResponse } from '@angular/common/http';
import { CategoryProductService } from '../../category-product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  //categoryForm: FormGroup;

   categoryId: string;
   categoryName: string;
  constructor(
    private categoryProductService: CategoryProductService,
    private route: ActivatedRoute,
    private router: Router,
    
  ){ }

   ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.categoryId = params.categoryId;
        this.categoryName = params.categoryName;
        console.log(params.categoryId);
      }
    )
  }
  
  onCreate(name:string,category:string,description:string,price:string) {
    this.categoryProductService.createProduct(name,category,description,price).subscribe(res=> {
      
        // we have logged in successfully
        this.router.navigate(['/products',this.categoryId,this.categoryName]);
        console.log(res);
      
   });
   }


}