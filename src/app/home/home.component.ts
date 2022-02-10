import { Component, OnInit } from '@angular/core';
import { Item } from '../interfaces/item';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  apparel: Item[];
  filterText: string;
  newArray: any;
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.filterItems().subscribe((data: Item[]) => {
      this.apparel = data;
    })
  }

  onSearchUpdated(event): void {
    console.log(event, 'home')
    this.filterText = event;
    this.newArray = [];
    this.newArray = this.apparel.filter((item) => {
      if (this.filterText === item.item) {
        this.newArray.push(item)
      }
      if (this.newArray !== undefined) {
        this.apparel = this.newArray;
      }
    })
  }
}
