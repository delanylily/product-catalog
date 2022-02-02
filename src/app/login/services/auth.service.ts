import { Injectable } from '@angular/core';
import { Auth, getAuth, signInWithRedirect, signOut } from 'firebase/auth';
import * as firebase from "firebase/auth";
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: any = getAuth();
  user: firebase.User;
  constructor(private router: Router) {
  }

  signIn(): Observable<any> {
    return from(signInWithRedirect(this.auth, new firebase.GoogleAuthProvider()))
  }

  signOut(): Observable<any> {
    return from(this.auth.signOut());
  }

  logout(): void {
    signOut(this.auth)
      .then(() => {
        this.router.navigate([''])
      })
      .catch(error => console.log(error));
  }
}
