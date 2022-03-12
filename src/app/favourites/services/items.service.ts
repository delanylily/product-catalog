import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Item } from 'src/app/interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  addAndStoreItems(content: any) {
    const itemData: Item = content;
    itemData.like = false;
    this.http.post<{ name: string }>('https://local-shop-9c674-default-rtdb.europe-west1.firebasedatabase.app/posts.json', itemData)
      .subscribe(responseData => {
        console.log(responseData, 'hey');
      })
  }

  fetchItems() {
    return this.http.get<{ [key: string]: Item }>('https://local-shop-9c674-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
      .pipe(map(response => {
        const itemsArray: Item[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            itemsArray.push({ ...response[key], id: key })
          }
        }
        return itemsArray;
      }))
  }
}

