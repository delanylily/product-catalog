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
    this.likedItems[index].like = !this.likedItems[index].like;
    this.likeToggle = this.likedItems[index].like;
    this.categoryService.updateItem(this.likedItems, index, this.likeToggle);
    this.likedItems.splice(index);
  }
}
