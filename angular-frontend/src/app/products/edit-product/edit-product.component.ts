import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CategoryProductService } from '../../category-product.service';
import { Product } from '../products.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId: string; 
  categoryId: string;
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
  }

  updateProduct(name: string, description: string, price: string) {
    this.categoryProductService.updateProduct(this.categoryId, this.productId, name,description,price).subscribe(() => {
      this.router.navigate(['/products',this.categoryId]);
    })
  }

}