import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, onValue, ref } from 'firebase/database';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from './interfaces/item';
import { Categories } from './models/categories';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  db: any;
  dbRef: any;
  categories: Categories
  app = initializeApp(environment.firebaseConfig);
  constructor(private readonly http: HttpClient) {
    this.db = getDatabase(this.app);
    this.dbRef = ref(this.db);

    // get(child(this.dbRef, `categories/`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });


  }

  filterItems(): Observable<any> {
    return this.http.get<Item[]>('./assets/data/apparel.json')
  }

  getCategories() {
    return this.categories;

    //return this.database.app
    // const categories = ref(this.database, '/categories');
    // console.log(categories.key, 'cate')
    // return categories;
    // const db = getDatabase();
    // const starCountRef = ref(db, 'categories/');
    // onValue(starCountRef, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log(data)
    // });

  }



  // const dbRef = ref(getDatabase());
  // get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log(snapshot.val());
  //   } else {
  //     console.log("No data available");
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });


}
