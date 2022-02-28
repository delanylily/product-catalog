import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.less']
})
export class FavouritesComponent implements OnInit {
  likedItems = [];
  likeToggle: boolean;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    // this.getResults();
    this.categoryService.getResults().subscribe((items) => {
      const allItems = items;
      allItems.filter((item => {
        if (item.like) {
          this.likedItems = [];
          this.likedItems.push(item);
        }
        console.log(this.likedItems, 'sdfs')
      }))
    })
  }

  getResults(): void {
    this.categoryService.getResults().subscribe((items) => {
      const allItems = items;
      allItems.filter((item => {
        if (item.like) {
          this.likedItems = [];
          this.likedItems.push(item);
        }
      }))
    })
  }

  itemRemoved(index): void {
    this.likedItems[index].like = !this.likedItems[index].like;
    this.likeToggle = this.likedItems[index].like;
    this.categoryService.updateItem(this.likedItems, index, this.likeToggle);
    this.likedItems.splice(index);
    console.log(this.likedItems, 'removed')
  }
}
