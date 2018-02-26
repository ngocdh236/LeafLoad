import { Component, EventEmitter, Output } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, AlertController } from 'ionic-angular';
import { MediaDataProvider } from "../../providers/media-data/media-data";
import { CommentPage } from "../comment/comment";
import { ModifyUserDataPage } from "../modify-user-data/modify-user-data";
import { UserSession } from "../../app/UserSession";
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  mediaArray: any[] = [];
  numberOfFilesPerRequest = 10;
  currentPage = 0;
  infiniteScroll: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public mediaData: MediaDataProvider, private alertCtrl: AlertController) {
    this.currentPage = 0;
    this.mediaArray = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.loadMediaFilesOfCurrentUser(this.currentPage);
    console.log(`AccessToken: ${UserSession.accessToken}`);
    console.log(`UserId: ${UserSession.userId}`);
    console.log(`Username: ${UserSession.username}`);
  }

  loadMediaFilesOfCurrentUser(page: number) {
    this.mediaData.getMediaFilesOfCurrentUser(this.currentPage, this.numberOfFilesPerRequest).subscribe(res => {
      console.log(res);
      const newFiles: any = res;
      newFiles.map(media => {
        const temp = media.filename.split('.');
        const thumbName = temp[0] + '-tn320.png';
        media.thumbnail = this.mediaData.mediaURL + thumbName;
        this.mediaArray.push(media);

      });

      // Increase the current page index
      this.currentPage += 1;

      // Complete the the scrolling indicator
      if (this.infiniteScroll != null) {
        this.infiniteScroll.complete();
      }
      });
  }

  like(ev: any) {

  }

  modifyUserData () {
    let modifyUserDataModel = this.modalCtrl.create(ModifyUserDataPage, event);
    modifyUserDataModel.present();
  }

  comment(ev: any) {

  }

  presentLogoutAlert() {
    let alert = this.alertCtrl.create({
    title: 'Logout',
    message: 'Are you sure to logout?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
        }
      },
      {
        text: 'Logout',
        handler: () => {
          UserSession.logout();

          console.log(`AccessToken: ${UserSession.accessToken}`);
          console.log(`UserId: ${UserSession.userId}`);
          console.log(`Username: ${UserSession.username}`);
        }
      }
    ]
  });

  alert.present();
  }


}
