import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, AlertController, Content, Events } from 'ionic-angular';
import { MediaDataProvider } from "../../providers/media-data/media-data";
import { CommentPage } from "../comment/comment";
import { ModifyUserDataPage } from "../modify-user-data/modify-user-data";
import { UserSession } from "../../app/UserSession";
import { LoginTemplatePage } from "../login-template/login-template";
import { UserDataProvider } from "../../providers/user-data/user-data";
import { GridTemplatePage } from "../grid-template/grid-template";
import { SinglePostTemplatePage } from "../single-post-template/single-post-template";

const UserLoggedInEvent = "UserLoggedInEvent";
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
  @ViewChild(Content) content;

  layoutType: LayoutType = LayoutType.VerticalFlow;

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

    events.subscribe(DidDeletePostEvent, (mediaFile) => {
      this.didDeleteMediaFile(mediaFile);
    });
  }

  ionViewDidLoad() {
    // Intialize layout type
    this.layoutType = LayoutType.VerticalFlow;

    this.loadMediaFilesOfCurrentUser(this.currentPage);

    // Silently update user info whenever user launches the app
    this.userDataProvider.requestCurrentUserInfo().subscribe(res => {
      // TODO: Move this line below to the service itself
      UserSession.updateWithNewInfo(res);
    });
  }

  loadMediaFilesOfCurrentUser(page: number) {
    this.mediaData.getMediaFilesOfCurrentUser(this.currentPage, this.numberOfFilesPerRequest).subscribe(res => {
      this.mediaArray = res as any[];

      // WORKAROUND: Resize the content otherwise the navbar would overlap the content
      this.content.resize();
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

  didSucceedToLogin(ev: any) {

  }

  private didDeleteMediaFile(ev: any) {
    for (let i = 0; i < this.mediaArray.length ; i++) {
      if (this.mediaArray[i].file_id == ev.file_id) {

        this.mediaArray.splice(i, 1);
      }
    }
  }

  private reloadPostData() {
    // Remove user data
    this.mediaArray = [];
    this.loadMediaFilesOfCurrentUser(this.currentPage);
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
    this.layoutType = LayoutType.VerticalFlow
  }

  public switchLayoutGridLayout() {
    this.layoutType = LayoutType.Grid;
  }
}
