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
  filteredItems: any;
  filterText: string;
  newArray: any;
  category = '';
  categories = [];
  filterButtonValue: string;
  items: any;
  likedItems = [];
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getResults().subscribe((clothes) => {
      this.items = clothes;
      this.filteredItems = this.items;
    })
  }

  getItems(): void {
    this.categoryService.getResults().subscribe((clothes) => {
      this.items = clothes;
    })
  }

  filterCategory(value: any) {
    this.filterButtonValue = value;
    this.onSearchUpdated(this.filterButtonValue);
  }

  itemLiked(index): void {
    this.likedItems.push(this.items[index])
    console.log(this.likedItems, 'liked')
  }

  search(): void {
    if (this.filterText) {
      this.items = this.newArray;
    } else {
      this.getItems();
    }
  }

  onSearchUpdated(event): void {
    this.filterText = event;
    this.newArray = [];
    // if (this.filterText !== "") {
    this.newArray = this.items.filter(item => this.filterText === item.category || this.filterText === item.colour)
    this.search();
    // }
    // else {
    //   this.search();
    // }
  }
}
