import { Component, Output, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { EventEmitter } from '@angular/core';
import { UserDataProvider } from "../../providers/user-data/user-data";
import { UserSession } from "../../app/UserSession";
import { HttpErrorResponse } from "@angular/common/http";
import { SignupPage } from "../signup/signup";
import { User } from "../../interfaces/User";

/**
 * Generated class for the LoginTemplatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-template',
  templateUrl: 'login-template.html',
})
export class LoginTemplatePage {
  user: User = {
    username: '',
    user_id: '',
    username: '',
    email: '',
    password: '',
    full_name: ''
  };
  status: String;

  @Input() showSkipButton: boolean;
  @Input() showSignUpButton: boolean;

  @Output() login: EventEmitter<any> = new EventEmitter();
  @Output() signUp: EventEmitter<any> = new EventEmitter();
  @Output() skip: EventEmitter<any> = new EventEmitter();

  @Output() didSucceedToLogin: EventEmitter<any> = new EventEmitter();
  @Output() didSucceedToSignUp: EventEmitter<any> = new EventEmitter();
  @Output() didFailToLogin: EventEmitter<any> = new EventEmitter();
  @Output() didFailToSignup: EventEmitter<any> = new EventEmitter();

  // Update these properties to hide/show the view
  public shouldShowSkipButton: boolean = true;
  public shouldShowSignUpButton: boolean = true;

  // Present modally
  presentedModally: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userDataProvider: UserDataProvider, private viewController: ViewController) {
    this.showSkipButton = true;
    this.showSignUpButton = true;

    this.presentedModally = navParams.get('modal');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginTemplatePage');
  }

  emitLoginEvent() {
    this.login.emit(this.user);
    this.userDataProvider.login(this.user).subscribe(response => {
      UserSession.loginSuccessfullyWithDictionary(response);
      this.didSucceedToLogin.emit(response);

      if (this.presentedModally) {
        this.viewController.dismiss();
      }

    }, (error: HttpErrorResponse) => {
      this.status = (error.error.message);
      this.didFailToLogin.emit(error);
    });
  }

  emitSignUpEvent() {
    this.signUp.emit(null);
    this.navCtrl.push(SignupPage);
  }

  emitSkipEvent() {
    this.skip.emit(null);
    // Fragile here
    this.viewController.dismiss();
  }

  // Update status (error) message
  updateAlert(message: string) {
    this.status = message;
  }
}
