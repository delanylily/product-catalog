import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, onValue, orderByChild, push, query, ref, set } from 'firebase/database';
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
    //  console.log(this.clothes, 'clote')
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

  // filterItems(): Observable<any> {
  //   onValue(this.dbRef, (snapshot) => {
  //     snapshot.forEach((childSnapshot) => {
  //       this.childKey = childSnapshot.key;
  //       this.clothingData = childSnapshot.val();
  //       console.log(this.clothingData)
  //     })
  //   },
  //     {
  //       onlyOnce: true
  //     })
  //   return this.clothingData;

  //   //  return this.http.get
  //   //  return this.http.get<Item[]>(this.clothingData)

  //   // return this.http.get<Item[]>('./assets/data/apparel.json')
  // }





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

