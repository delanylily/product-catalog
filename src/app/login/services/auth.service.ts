import { Injectable } from '@angular/core';
import { getAuth, signInWithRedirect, signOut } from 'firebase/auth';
import * as firebase from "firebase/auth";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: any = getAuth();
  user: firebase.User;
  constructor(private router: Router) {
  }

  login(): void {
    signInWithRedirect(this.auth, new firebase.GoogleAuthProvider());
  }

  logout(): void {
    signOut(this.auth)
      .then(() => {
        this.router.navigate([''])
      })
      .catch(error => console.log(error));
  }
}
