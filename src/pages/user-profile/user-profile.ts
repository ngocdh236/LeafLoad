import {Component, ViewChild} from '@angular/core';
import {Content, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { User } from "../../interfaces/User" ;
import { UserDataProvider } from "../../providers/user-data/user-data";
import { MediaDataProvider } from "../../providers/media-data/media-data";
import { UserSession } from "../../app/UserSession";
import { ModifyUserDataPage } from "../modify-user-data/modify-user-data";
import { SinglePostTemplatePage } from "../single-post-template/single-post-template";
import { LoginTemplatePage } from "../login-template/login-template";

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const UserLoggedInEvent = "UserLoggedInEvent";
const UserUpdatedInfoEvent = "UserUpdatedInfoEvent";
const DidDeletePostEvent = "DidDeletePostEvent";

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
  numberOfFilesPerRequest = 10;
  currentPage = 0;

  public get isUserLoggedIn(): boolean {
    return UserSession.isLoggedIn;
  }

  public get isCurrentUser(): boolean {
    if (this.userId.toString() == UserSession.userId)
      return true;
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userDataProvider: UserDataProvider,
              private mediaDataProvider: MediaDataProvider,
              private events: Events) {
    if (navParams.get("user_id")) {
      this.userId = navParams.get("user_id");
    }

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
    this.layoutType = LayoutType.Grid;


    // this.downloadMediaFiles();
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
