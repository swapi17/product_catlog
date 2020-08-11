import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CategoryProductService } from '../../category-product.service';
import { Category } from '../category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
   
  categoryId: string; 
  constructor(private route: ActivatedRoute, private categoryProductService: CategoryProductService, private router: Router) { }

  ngOnInit() {
     this.route.params.subscribe(
      (params: Params) => {
        this.categoryId = params.categoryId;
        console.log(params.categoryId);
      }
    )
  }

  updateCategory(name: string, description: string) {
    this.categoryProductService.updateCategory(this.categoryId,new Category(name,description)).subscribe(() => {
      this.router.navigate(['/category']);
    })
  }

}