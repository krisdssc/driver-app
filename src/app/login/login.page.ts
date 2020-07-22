import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  // signOut() {
  //   this.afAuth.auth.signOut().then(() => {
  //     local.reload();
  //   });
  // }

  ngOnInit() {
  }

}
