import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, onValue, orderByChild, push, query, ref, set, update } from 'firebase/database';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from './interfaces/item';
import { Categories } from './models/categories';
import * as firebase from "firebase/auth";
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  db: any;
  dbRef: any;
  categories: Categories
  // clothingData: any;
  clothingData: BehaviorSubject<any>;
  clothingData$: Observable<any>;
  childKey: any;
  clothes = new Subject();
  app = initializeApp(environment.firebaseConfig);

  constructor(private readonly http: HttpClient) {
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

