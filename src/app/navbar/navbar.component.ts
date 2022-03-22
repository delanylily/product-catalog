import { Component, OnInit, OnDestroy } from '@angular/core';

import { getAuth } from "firebase/auth";
// import { AuthService } from '../login/services/auth.service';
import * as firebase from "firebase/auth";
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit, OnDestroy {
  auth: any = getAuth();
  // user: firebase.User;
  userSubscription: Subscription
  isAuthenticated = false;
  constructor(private authService: AuthService) {
    // this.checkLoginState();
  }
  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }
  onLogout() {
    this.authService.logout();
  }

  // checkLoginState(): void {
  //   this.auth.onAuthStateChanged((user) => {
  //     this.user = user;
  //   });
  // }

  // logout(): void {
  //   this.authService.logout();
  // }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }


}

