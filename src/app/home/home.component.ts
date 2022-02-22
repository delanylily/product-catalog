import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Item } from '../interfaces/item';
import { CategoryService } from '../category.service';
import { getDatabase, ref, set } from "firebase/database";

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
      console.log(this.items, 'items')
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
    const itemData = {
      category: this.items[index].category,
      color: this.items[index].color,
      id: this.items[index].id,
      imageUrl: this.items[index].imageUrl,
      like: true,
      size: this.items[index].size
    }
    console.log(itemData, 'data')

    this.likedItems.push(this.items[index]);
    console.log(this.likedItems, 'liked')
    this.categoryService.likeItem(itemData, index)
    //  this.writeUserData();
  }

  writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl
    });
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
    this.newArray = this.items.filter(item => this.filterText === item.category || this.filterText === item.colour)
    this.search();
  }
}
