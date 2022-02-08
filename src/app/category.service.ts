import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, onValue, ref } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { Categories } from './models/categories';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  db: any;
  dbRef: any;
  categories: Categories
  app = initializeApp(environment.firebaseConfig);
  constructor() {
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
