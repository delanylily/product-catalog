import { Component, OnInit } from '@angular/core';
import { Item } from '../interfaces/item';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  // apparel: Item[];\
  apparel: any;
  filterText: string;
  newArray: any;
  category = '';
  categories = [];
  filterButtonValue: string;
  items: any;
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.filterItems().subscribe((data: Item[]) => {
      if (data) {
        this.items = data;
        this.apparel = data;
      }
    })
  }

  filterCategory(value: any) {
    this.filterButtonValue = value;
    this.onSearchUpdated(this.filterButtonValue);
  }

  search(): void {
    if (this.filterText) {
      this.items = this.newArray;
      console.log(this.apparel)
    } else {
      this.categoryService.filterItems().subscribe((data: Item[]) => {
        if (data) {
          this.items = data;
        }
      })
    }
  }

  onSearchUpdated(event): void {
    this.filterText = event;
    this.newArray = [];
    if (this.filterText !== "") {
      this.newArray = this.apparel.filter(item => this.filterText === item.item || this.filterText === item.colour)
      this.search();
    }
    else {
      this.search();
    }
  }
}
