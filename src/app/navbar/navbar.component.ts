import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from "firebase/auth";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Observable } from 'rxjs';


@Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent {
  auth: any = getAuth();
  user: firebase.User;
  //$user: Observable<firebase.User>;

  constructor(private router: Router) {
    this.checkLoginState();
  }

  checkLoginState(): void {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }

  logout(): void {
    signOut(this.auth)
      .then(() => {
        this.router.navigate([''])
      })
      .catch(error => console.log(error));
  }
}

