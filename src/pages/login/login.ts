import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from "../../providers/user-data/user-data";
import { User } from "../../interfaces/user";
import { HttpErrorResponse } from "@angular/common/http";
import { SignupPage } from "../signup/signup";
import { TabsPage } from "../tabs/tabs";
import {UserSession} from "../../app/UserSession";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: User;
  status: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.userData.login(this.user).subscribe(response => {
      // localStorage.setItem('token', response['token']);
      this.navCtrl.setRoot(TabsPage);
      this.navCtrl.popToRoot();
    }, (error: HttpErrorResponse) => {
      this.status = error.error.message;
    });
  }

  signUp() {
    this.navCtrl.push(SignupPage);
  }

  skip() {
    this.navCtrl.setRoot(TabsPage);
    this.navCtrl.popToRoot();
  }
}
