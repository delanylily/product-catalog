import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, set } from "firebase/database";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.less']
})
export class FavouritesComponent implements OnInit {

  constructor() { }

  ngOnInit() {


    function writeUserData(userId, name, email, imageUrl) {
      const db = getDatabase();
      set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
        profile_picture: imageUrl
      });
    }
  }

}
