import { Component, ViewChild  } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import { MediaDataProvider } from "../../providers/media-data/media-data";
import { LoginPage } from "../login/login";
import { LoginTemplatePage } from "../login-template/login-template";
import { CommentPage } from "../comment/comment";
import { UserSession } from "../../app/UserSession";

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

  loginPage: any = LoginPage;
  mediaArray: any;
  isLoading: boolean = false;

  public get isUserLoggedIn(): boolean {
    return UserSession.isLoggedIn;
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaData: MediaDataProvider, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {

  }

  onInput(ev: any) {
    let keyword = ev.target.value;
    if (keyword && keyword.trim() !== '') {
      this.mediaArray = [];
      this.isLoading = true;
      this.mediaData.searchMediaFiles(keyword).subscribe(res => {
        this.isLoading = false;
        this.mediaArray = res;
      }, (error) => {

      });
    } else {
      // Revert search result
      this.mediaArray = [];
    }
  }

  onLogin(ev: any) {

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
