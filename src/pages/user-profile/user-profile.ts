import {Component, ViewChild} from '@angular/core';
import {Content, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { User } from "../../interfaces/User" ;
import { UserDataProvider } from "../../providers/user-data/user-data";
import { MediaDataProvider } from "../../providers/media-data/media-data";
import { UserSession } from "../../app/UserSession";
import { SinglePostTemplatePage } from "../single-post-template/single-post-template";
import { LoginTemplatePage } from "../login-template/login-template";

const UserLoggedInEvent = "UserLoggedInEvent";
const UserUpdatedInfoEvent = "UserUpdatedInfoEvent";

export enum LayoutType {
  VerticalFlow,
  Grid
}

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  @ViewChild(LoginTemplatePage) loginTemplate;
  @ViewChild(Content) content;

  layoutType: LayoutType = LayoutType.Grid;

  user: User;
  userId: number;
  mediaArray: any[] = [];

  public get isUserLoggedIn(): boolean {
    return UserSession.isLoggedIn;
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userDataProvider: UserDataProvider,
              private mediaDataProvider: MediaDataProvider,
              private events: Events) {
    if (navParams.get("user_id")) {
      this.userId = navParams.get("user_id");
    }

    this.events.subscribe(UserLoggedInEvent, () => {
      this.reloadPostData();
    });

    this.events.subscribe(UserUpdatedInfoEvent, () => {
      this.reloadPostData();
    });


  }

  ionViewDidLoad() {
    // Intialize layout type
    this.layoutType = LayoutType.Grid;

    this.downloadUserProfile();

    this.downloadMediaFiles();
    // UserSession.updateWithNewInfo(res);

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

        // WORKAROUND: Resize the content otherwise the navbar would overlap the content
        this.content.resize();
      });
    }
  }



  private reloadPostData() {
    // Remove user data
    this.mediaArray = [];
    this.downloadMediaFiles();
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
}
