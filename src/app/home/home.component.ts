import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface Item {
  item: string;
  id: string;
  price: number;
  colour: string;
  size: string;
  image: string;

}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  apparel: Item[];
  filterText: string;
  newArray: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Item[]>('./assets/data/apparel.json')
      .subscribe((data: Item[]) => {
        this.apparel = data;
        console.log(this.apparel, 'apparel')
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
      console.log(this.apparel)
    })
  }

  // filterItems(): void {

  // }

}
