import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../interfaces/User" ;
import { UserDataProvider } from "../../providers/user-data/user-data";
import { MediaDataProvider } from "../../providers/media-data/media-data";

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  user: User;
  userId: number;
  mediaArray: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private userDataProvider: UserDataProvider, private mediaDataProvider: MediaDataProvider) {
    if (navParams.get("user_id")) {
      this.userId = navParams.get("user_id");
    }
  }

  ionViewDidLoad() {
    this.downloadUserProfile();
    this.downloadMediaFiles();
  }

  downloadUserProfile() {
    if (this.userId) {
      this.userDataProvider.requestUserInfoByUserId(this.userId).subscribe(res => {
        this.user = res as User;
      });
    }
  }

  downloadMediaFiles() {
    if (this.userId) {
      this.mediaDataProvider.getMediaFilesForUser(this.userId).subscribe(res => {
        this.mediaArray = res as any[];
      });
    }
  }
}
