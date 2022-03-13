import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Item } from '../interfaces/item';
import { CategoryService } from '../category.service';
import { getDatabase, ref, set } from "firebase/database";
import { filter, map } from 'rxjs/operators';
import { ItemsService } from '../favourites/services/items.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  // apparel: Item[];\
  filterText: string;
  newArray = [];
  category = '';
  categories = [];
  filterButtonValue: string;
  items: any;
  likedItems = [];
  likeItem: boolean = false;
  indexActive: number = 0;
  updatedData: any;
  likeToggle: boolean;
  isFetching = false;
  selectedItem: Item;
  constructor(private categoryService: CategoryService, private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.isFetching = true;
    this.itemsService.fetchItems()
      .subscribe(items => {
        this.items = items;
        this.isFetching = false;
      })
  }

  filterCategory(value: any) {
    this.onSearchUpdated(value);
  }

  itemLiked(index): void {
    this.selectedItem = this.items[index];
    this.selectedItem.like = !this.selectedItem.like;
    this.likeToggle = this.selectedItem.like;
    this.categoryService.updateItem(this.selectedItem, this.likeToggle)
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
    this.itemsService.fetchItems()
      .pipe(map(items => {
        this.newArray = items.filter(item => item.category === this.filterText);
        console.log(this.newArray, 'filtered')
        this.items = this.newArray;
      }))
      .subscribe();
    // this.newArray = [];
    // this.newArray = this.items.filter(item => this.filterText === item.category || this.filterText === item.colour)
    // this.search();
  }
}
