import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, onValue, orderByChild, push, query, ref, set, update } from 'firebase/database';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from './interfaces/item';
import { Categories } from './models/categories';
import * as firebase from "firebase/auth";
import { categories, colors, sizes } from './app.constants';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  db: any;
  dbRef: any;
  categories: Array<{ value: string, name: string }>;
  colors: Array<{ value: string, name: string }>;
  sizes: Array<{ value: string, name: string }>;
  clothingData: BehaviorSubject<any>;
  clothingData$: Observable<any>;
  childKey: any;
  newIndex: number;
  clothes = new Subject();
  app = initializeApp(environment.firebaseConfig);

  constructor(private readonly http: HttpClient) {
    this.categories = categories;
    this.colors = colors;
    this.sizes = sizes;
    this.clothingData = new BehaviorSubject<any>([]);
    this.clothingData$ = this.clothingData.asObservable();
    this.db = getDatabase();
    this.dbRef = ref(this.db);

    onValue(this.dbRef, (snapshot) => {
      if (snapshot !== undefined) {
        snapshot.forEach((childSnapshot) => {
          this.childKey = childSnapshot.key;
          this.clothes.next(childSnapshot.val());
        })
      }
    },
      {
        onlyOnce: true
      })

  }

  getResults(): Subject<any> {
    onValue(this.dbRef, (snapshot) => {
      if (snapshot !== undefined) {
        snapshot.forEach((childSnapshot) => {
          this.childKey = childSnapshot.key;
          this.clothes.next(childSnapshot.val());
        })
      }
    },
      {
        onlyOnce: true
      })
    return this.clothes;
  }

  updateItem(items: any, index: number, likeToggle: boolean) {
    console.log(items, 'cl')
    const itemData = {
      category: items[index].category,
      color: items[index].color,
      id: items[index].id,
      imageUrl: items[index].imageUrl,
      like: items[index].like = likeToggle,
      size: items[index].size
    }
    const updates = {};
    updates['/Items/' + index] = itemData;
    return update(ref(this.db), updates)
      .then(() => {
        console.log('saved succesfully')
        this.getResults();
      })
      .catch((error) => {
        console.log(error, 'like failed')
      })
  }


  addItem(item): void {
    onValue(this.dbRef, (snapshot) => {
      if (snapshot !== undefined) {
        snapshot.forEach((childSnapshot) => {
          this.childKey = childSnapshot.key;
          const items = childSnapshot.val();
          if (items !== undefined) {
            this.newIndex = items.length;
            set(ref(this.db, 'Items/' + 0), {
              category: item.category,
              color: item.color,
              id: 'coat1',
              imageUrl: item.imageUrl,
              size: item.size,
              like: false
            })
          }
          console.log(items, 'clottthes', this.newIndex);
        })
      }
    },
      {
        onlyOnce: true
      })
  }

  getCategories(items: any): any {
    onValue(this.dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.childKey = childSnapshot.key;
        this.clothingData = childSnapshot.val();
        items = this.clothingData;
      })
    },
      {
        onlyOnce: true
      })
  }
}

