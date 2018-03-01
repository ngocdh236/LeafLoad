import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, AlertController, Content, Events } from 'ionic-angular';
import { MediaDataProvider } from "../../providers/media-data/media-data";
import { CommentPage } from "../comment/comment";
import { ModifyUserDataPage } from "../modify-user-data/modify-user-data";
import { UserSession } from "../../app/UserSession";
import { LoginTemplatePage } from "../login-template/login-template";
import { UserDataProvider } from "../../providers/user-data/user-data";

const UserLoggedInEvent = "UserLoggedInEvent";
const UserUpdatedInfoEvent = "UserUpdatedInfoEvent";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  @ViewChild(LoginTemplatePage) loginTemplate;
  @ViewChild(Content) content;

  mediaArray: any[] = [];
  numberOfFilesPerRequest = 10;
  currentPage = 0;
  infiniteScroll: any;

  public get isUserLoggedIn(): boolean {
    return UserSession.isLoggedIn;
  }

  public get username(): string {
    return UserSession.username;
  };

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public mediaData: MediaDataProvider, private alertCtrl: AlertController, public userDataProvider: UserDataProvider, private events: Events) {
    this.currentPage = 0;
    this.mediaArray = [];

    events.subscribe(UserLoggedInEvent, () => {
      this.reloadPostData();
    });

    events.subscribe(UserUpdatedInfoEvent, () => {
      this.reloadPostData();
    });
  }

  ionViewDidLoad() {
    this.loadMediaFilesOfCurrentUser(this.currentPage);

    // Silently update user info whenever user launches the app
    this.userDataProvider.requestCurrentUserInfo().subscribe(res => {
      // TODO: Move this line below to the service itself
      UserSession.updateWithNewInfo(res);
    });
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

  modifyUserData() {
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
        }
      }
    ]
  });

  alert.present();
  }

  onLogin(ev: any) {

  }

  onSignUp(event: any) {

  }

  onCancel(ev: any) {

  }

  onSkip(ev: any) {

  }

  // TODO: Deprecated. Use the Events instead.
  didSucceedToLogin(ev: any) {
    this.reloadPostData();
  }

  private reloadPostData() {
    // Remove user data
    this.mediaArray = [];

    // Resize the content otherwise the navbar would overlap the content
    this.content.resize();
    this.loadMediaFilesOfCurrentUser(this.currentPage);
  }
}
