import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { ItemsService } from '../favourites/services/items.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.less']
})
export class AddItemComponent implements OnInit {
  addItemForm: FormGroup;
  categories: Array<any>;
  colors: Array<any>;
  sizes: Array<any>;
  constructor(private itemsService: ItemsService, private http: HttpClient, private categoryService: CategoryService) {
    this.categories = categoryService.categories;
    this.colors = categoryService.colors;
    this.sizes = categoryService.sizes;
    console.log(this.categories, 'categories')
    this.addItemForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
  }

  addItem({ value, valid }: { value: any, valid: boolean }): void {
    if (valid) {
      this.itemsService.addAndStoreItems(value)
    }
  }
}
