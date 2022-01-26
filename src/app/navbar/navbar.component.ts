import { Component } from '@angular/core';
import * as firebase from "firebase/auth";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


@Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent {
  auth: any = getAuth()
  constructor() {
    this.auth.onAuthStateChanged((user) => {
      console.log(user)
    });
  }

  logout(): void {
    this.auth = getAuth();
    signOut(this.auth);
  }

}

