import {Component, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, AlertController, Content, Events} from 'ionic-angular';
import {MediaDataProvider} from "../../providers/media-data/media-data";
import {ModifyUserDataPage} from "../modify-user-data/modify-user-data";
import {UserSession} from "../../app/UserSession";
import {LoginTemplatePage} from "../login-template/login-template";
import {UserDataProvider} from "../../providers/user-data/user-data";
import {SinglePostTemplatePage} from "../single-post-template/single-post-template";

const UserLoggedInEvent = "UserLoggedInEvent";
const UserLoggedOutEvent = "UserLoggedOutEvent";
const UserUpdatedInfoEvent = "UserUpdatedInfoEvent";
const DidDeletePostEvent = "DidDeletePostEvent";

export enum LayoutType {
  VerticalFlow,
  Grid
}

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  @ViewChild(LoginTemplatePage) loginTemplate;
  @ViewChild(Content) content: Content;

  layoutType: LayoutType = LayoutType.Grid;

  mediaArray: any[] = [];
  currentPage = 0;

  public get isUserLoggedIn(): boolean {
    return UserSession.isLoggedIn;
  }

  public get username(): string {
    return UserSession.username;
  };

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              public mediaData: MediaDataProvider,
              private alertCtrl: AlertController,
              public userDataProvider: UserDataProvider,
              private events: Events) {

    this.currentPage = 0;
    this.mediaArray = [];

    events.subscribe(UserLoggedInEvent, () => {
      this.reloadPostData(null);
    });

    events.subscribe(UserUpdatedInfoEvent, () => {
      this.reloadPostData(null);
    });

    events.subscribe(DidDeletePostEvent, (mediaFile) => {
      this.didDeleteMediaFile(mediaFile);
    });
  }

  ionViewDidLoad() {
    // Intialize layout type
    this.layoutType = LayoutType.Grid;

    // this.loadMediaFilesOfCurrentUser(this.currentPage);
    this.loadMediaFilesOfCurrentUser(null);


    // Silently update user info whenever user launches the app
    this.userDataProvider.requestCurrentUserInfo().subscribe(res => {
      // TODO: Move this line below to the service itself
      UserSession.updateWithNewInfo(res);
    });
  }

  loadMediaFilesOfCurrentUser(completionHandler: (succeed: boolean) => void) {
    this.mediaData.getMediaFilesOfCurrentUser().subscribe(res => {
      this.mediaArray = res as any[];

      if (completionHandler) {
        completionHandler(true);
      }

      this.mediaArray = res as any[];

      // WORKAROUND: Resize the content otherwise the navbar would overlap the content
      this.content.resize();
    });
  }


  modifyUserData() {
    let modifyUserDataModel = this.modalCtrl.create(ModifyUserDataPage, event);
    modifyUserDataModel.present();
  }


  presentLogoutAlert() {
    let alert = this.alertCtrl.create({
      title: 'Log Out',
      message: 'Are you sure to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Log Out',
          handler: () => {
            UserSession.logout();
            UserSession.logout();
            this.events.publish(UserLoggedOutEvent);
          }
        }]
      });

    alert.present();
  }


  like(ev: any) {

  }

  comment(ev: any) {

  }

  onLogin(ev: any) {

  }

  onSignUp(event: any) {

  }

  onCancel(ev: any) {

  }

  onSkip(ev: any) {

  }


  private didDeleteMediaFile(ev: any) {
    for (let i = 0; i < this.mediaArray.length; i++) {
      if (this.mediaArray[i].file_id == ev.file_id) {

        this.mediaArray.splice(i, 1);
      }
    }
  }

  private reloadPostData(completionHandler: (succeeded: boolean) => void) {
    // Remove user data
    this.mediaArray = [];
    this.loadMediaFilesOfCurrentUser(completionHandler);
  }

  // Grid view events
  didSelectItem(ev: any) {
    this.navCtrl.push(SinglePostTemplatePage, ev);
  }

  public get shouldDisplayVerticalFlowLayout() {
    return this.layoutType === LayoutType.VerticalFlow;
  }

  public get shouldDisplayGridLayout() {
    return this.layoutType === LayoutType.Grid;
  }

  // NOTE: A function call from html file can not know LayoutType type. So we are unable to pass a LayoutType argument to switchLayout function which is called from html file.
  // TODO: Refactor this by using string enum. Since we are able pass a string as an argument to switchLayout function which can be called from html.
  public switchLayoutToVerticalFlowLayout() {
    this.layoutType = LayoutType.VerticalFlow;
  }

  public switchLayoutGridLayout() {
    this.layoutType = LayoutType.Grid;
  }

  doRefresh(refresher) {
    this.reloadPostData((succeeded) => {
      refresher.complete();
    });
  }
}
