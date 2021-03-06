import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../interfaces/user";
import { UserDataProvider } from "../../providers/user-data/user-data";
import { HttpErrorResponse } from "@angular/common/http";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user: User = {
    username: '',
    password: '',
    email: '',
    full_name: '',
    user_id: 0
  };
  status: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signUp() {
    this.userData.signUp(this.user).subscribe(response => {
      this.navCtrl.pop();
    }, (error: HttpErrorResponse) => {
      this.status = error.error.message;
    });
  }
}
