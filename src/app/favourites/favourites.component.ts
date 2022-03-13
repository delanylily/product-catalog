import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from '../category.service';
import { ItemsService } from './services/items.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.less']
})
export class FavouritesComponent implements OnInit {
  likedItems: any;
  likeToggle: boolean;
  userActivated: boolean;
  clothesSubscription: Subscription;
  isFetching = false;
  selectedItem: any;
  constructor(private categoryService: CategoryService, private itemsService: ItemsService, private http: HttpClient) {
  }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.isFetching = true;
    this.itemsService.fetchItems()
      .pipe(map(items => {
        this.likedItems = items.filter(item => item.like);
      }))
      .subscribe();
    this.isFetching = false;
  }

  itemRemoved(index): void {
    this.selectedItem = this.likedItems[index];
    this.selectedItem.like = !this.selectedItem.like;
    this.likeToggle = this.selectedItem.like;
    this.categoryService.updateItem(this.selectedItem, this.likeToggle);
    this.likedItems.splice(index);
  }
}
