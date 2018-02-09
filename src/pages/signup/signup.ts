import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../interfaces/user";
import {UserDataProvider} from "../../providers/user-data/user-data";
import {HttpErrorResponse} from "@angular/common/http";
import {HomePage} from "../home/home";
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login/login";

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
    full_name: ''
  };
  status: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signUp() {
    this.userData.signUp(this.user).subscribe(response => {
      console.log(response);
      this.navCtrl.push(HomePage);
    }, (error: HttpErrorResponse) => {
      this.status = error.error.message;
    });
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  skip() {
    this.navCtrl.push(TabsPage);
  }
}
