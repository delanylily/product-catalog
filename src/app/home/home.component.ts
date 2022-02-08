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


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Item[]>('./assets/data/apparel.json')
      .subscribe((data: Item[]) => {
        this.apparel = data;
        console.log(this.apparel, 'app')
      })
  }

}
