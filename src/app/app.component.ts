import { Component, OnInit } from '@angular/core';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { AuthService } from './login/services/auth.service';
import { getAuth } from 'firebase/auth';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHJpMLj6_vpbNMqIMiGFZbrboBDA9YPN0",
  authDomain: "local-shop-9c674.firebaseapp.com",
  databaseURL: "https://local-shop-9c674-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "local-shop-9c674",
  storageBucket: "local-shop-9c674.appspot.com",
  messagingSenderId: "46464114676",
  appId: "1:46464114676:web:4690197e34ec2eb90ce3a1",
  measurementId: "G-SX1KPMYCCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  user = getAuth();
  constructor(private auth: AuthService, router: Router, private userService: UserService) {
    // this.user.onAuthStateChanged((user) => {
    //   if (user) {
    //     this.userService.save(user);
    //     const returnUrl = localStorage.getItem('returnUrl');
    //     router.navigateByUrl(returnUrl);
    //   }
    // })
  }
}
