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

  //working
  // likeItem(like: boolean, index: number) {
  //   set(ref(this.db, 'Items/' + index), {
  //     like: like
  //   });
  // }

  likeItem(itemData: any, index: number) {

    const newItemKey = push(child(ref(this.db), 'Items'))
    const updates = {};

    //updates['/Items/' + newItemKey] = itemData;
    updates['/Items/' + index + newItemKey] = itemData;

    return update(ref(this.db), updates);
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

