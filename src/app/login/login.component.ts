import { Component } from '@angular/core';
import * as firebase from "firebase/auth";

import { getAuth, signInWithRedirect } from "firebase/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  constructor() {
  }

  login(): void {
    const auth = getAuth();
    signInWithRedirect(auth, new firebase.GoogleAuthProvider());
  }
}
