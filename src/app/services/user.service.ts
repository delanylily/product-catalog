import { Injectable } from '@angular/core';
import { getDatabase, ref, set } from "firebase/database";
import * as firebase from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  database = getDatabase();
  constructor() { }

  save(user: firebase.User) {
    set(ref(this.database, 'users/' + user.uid), {
      name: user.displayName,
      email: user.email
    })
  }
}
