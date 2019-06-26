import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'instagram-clone';

  ngOnInit(){
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDummHn9o4S581E_m1KAHcV7-gTNKEZEGI",
    authDomain: "instagram-clone-app12.firebaseapp.com",
    databaseURL: "https://instagram-clone-app12.firebaseio.com",
    projectId: "instagram-clone-app12",
    storageBucket: "",
    messagingSenderId: "818346679773",
    appId: "1:818346679773:web:26c32aba72e2244c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  }
}
