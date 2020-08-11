import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CategoryProductService } from '../../category-product.service';
import { Product } from '../products.model';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  
  productId: string; 
  categoryId: string;
  product:Product;

  constructor(private route: ActivatedRoute, private categoryProductService: CategoryProductService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.productId = params.productId;
        this.categoryId = params.categoryId;
        console.log(params.productId);
        console.log(params.categoryId);
      }
    )

    this.categoryProductService.getProductById(this.productId).subscribe((product:Product) => {
      
      this.product = product;
      
    })
  }



}