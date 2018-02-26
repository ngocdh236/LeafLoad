import { Component, ViewChild  } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import { MediaDataProvider } from "../../providers/media-data/media-data";
import { UserDataProvider } from "../../providers/user-data/user-data";
import { LoginPage } from "../login/login";
import { HttpErrorResponse } from "@angular/common/http";
import { LoginTemplatePage } from "../login-template/login-template";
import {CommentPage} from "../comment/comment";
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  @ViewChild(LoginTemplatePage) loginTemplate;

  isUserLoggedIn: boolean = false;
  loginPage: any = LoginPage;
  mediaArray: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaData: MediaDataProvider, private userDataProvider: UserDataProvider, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.loginTemplate.shouldShowSkipButton = false;
    this.loginTemplate.shouldShowSignUpButton = false;
    this.isUserLoggedIn = false;
    //this.isUserLoggedIn = this.userDataProvider.isUserLoggedIn();
    //console.log(`Is user logged in: ${this.userDataProvider.isUserLoggedIn()}`);
  }

  onInput(ev: any) {
    let keyword = ev.target.value;
    console.log(keyword);
    if (keyword && keyword.trim() !== '') {
      this.mediaArray = [];
      this.mediaData.searchMediaFiles(keyword).subscribe(res => {
        this.mediaArray = res;
        console.log(res);
      }, (error) => {

      });
    } else {
      // Revert search result
      this.mediaArray = [];
    }
  }

  onLogin(ev: any) {
    this.userDataProvider.login(ev).subscribe(response => {
      localStorage.setItem('token', response['token']);
      this.isUserLoggedIn = true;
    }, (error: HttpErrorResponse) => {
      this.loginTemplate.updateAlert(error.error.message);
    });
  }

  onSignUp(event: any) {

  }

  onCancel(ev: any) {

  }

  onSkip(ev: any) {

  }

  like(ev: any) {

  }

  comment(ev: any) {
    let profileModel = this.modalCtrl.create(CommentPage, ev);
    profileModel.present();
  }

}
