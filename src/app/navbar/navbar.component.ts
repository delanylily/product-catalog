import { Component } from '@angular/core';

import { getAuth } from "firebase/auth";
import { AuthService } from '../login/services/auth.service';
import * as firebase from "firebase/auth";

@Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent {
  auth: any = getAuth();
  user: firebase.User;
  constructor(private authService: AuthService) {
    this.checkLoginState();
  }

  checkLoginState(): void {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}

