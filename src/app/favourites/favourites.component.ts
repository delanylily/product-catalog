import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, set } from "firebase/database";
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.less']
})
export class FavouritesComponent implements OnInit {
  likedItems = [];
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    // this.categoryService.getResults().subscribe((items => {
    //   items.map((items => {
    //     if (items.like === true) {
    //       this.likedItems.push(items);
    //       console.log(this.likedItems, 'fav')
    //     }
    //   }))
    // }))


    this.categoryService.getResults().subscribe((items) => {
      const allItems = items;
      allItems.filter((item => {
        if (item.like) {
          this.likedItems.push(item);
        }
        console.log(this.likedItems, 'sdfs')
      }))
    })
  }
}
