import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { getAuth } from "firebase/auth";
import { AuthService } from "../login/services/auth.service";
import * as firebase from "firebase/auth";
import { getUser } from "./home.actions";

@Injectable({
  providedIn: 'root'
})

export class HomeEffects {
  auth: any = getAuth();
  user: firebase.User
  newUser: any;
  constructor(private store: Store<any>, private authService: AuthService) {
  }




  private getUserInformation(): void {
    this.auth.onAuthStateChanged((user) => {
      this.newUser = user;
      this.store.dispatch(getUser({ user }));
    })
  }
}
