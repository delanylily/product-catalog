import { Component, OnInit } from '@angular/core';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHJpMLj6_vpbNMqIMiGFZbrboBDA9YPN0",
  authDomain: "local-shop-9c674.firebaseapp.com",
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
export class AppComponent implements OnInit {
  title: string;
  ngOnInit(): void {
    this.title = 'local-shop';

  }
}
