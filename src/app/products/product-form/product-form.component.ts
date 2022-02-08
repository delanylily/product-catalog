import { Component, OnInit } from '@angular/core';
import { categories } from 'src/app/app.constants';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.less']
})
export class ProductFormComponent implements OnInit {
  // categories: Categories;
  categories: Array<any>;
  constructor(private categoryService: CategoryService) {
    this.categories = categories
  }

  ngOnInit(): void {
  }

}
