import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Category } from '../category.model';
import { HttpResponse } from '@angular/common/http';
import { CategoryProductService } from '../../category-product.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  //categoryForm: FormGroup;

 

  constructor(
    private categoryProductService: CategoryProductService,
    private router: Router,
    
  ){ }

   ngOnInit() {
    //   this.categoryForm = this.fb.group({
    //   name: [''],
    //   description: [''],
    // })
  }
  
  onCreate(name: string, description: string) {
    this.categoryProductService.createCategory(name,description).subscribe(res=> {
      
        // we have logged in successfully
        this.router.navigate(['/category']);
      
      console.log(res);
      
   });
   }


}