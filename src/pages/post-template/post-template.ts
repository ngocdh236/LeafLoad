import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { MediaDataProvider } from "../../providers/media-data/media-data";
import { UserDataProvider } from "../../providers/user-data/user-data";
import { UserSession } from "../../app/UserSession";
import { LoginPage } from "../login/login";
import { CommentPage } from "../comment/comment";
import { LikeListPage } from "../like-list/like-list";
import { UserProfilePage } from "../user-profile/user-profile";
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ThumbnailPipe } from "../../pipes/thumbnail/thumbnail";

/**
 * Generated class for the PostTemplatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 const DidDeletePostEvent = "DidDeletePostEvent";

@IonicPage()
@Component({
  selector: 'page-post-template',
  templateUrl: 'post-template.html',
})
export class PostTemplatePage {

  private _mediaData: any;
  private _liked: boolean = false;
  get mediaData(): any {
    return this._mediaData;
  }

  @Input()
  set mediaData(mediaData: any) {
    this._mediaData = mediaData;
    this.comments$ = this.mediaProvider.getCommentsForFile(this._mediaData.file_id);
    this.likes$ = this.mediaProvider.getLikesForMediaFile(this._mediaData.file_id);

    // Fetch likes
    this.mediaProvider.getLikesForMediaFile(this._mediaData.file_id).subscribe(res => {
      this.likes = res as any[];
      this.isLoadingLikes = false;
    });

    // Fetch comments
    this.mediaProvider.getCommentsForFile(this._mediaData.file_id).subscribe(res => {
      this.comments = res as any[];
      this.isLoadingComments = false;
    });
  };

  @Output() like: EventEmitter<any> = new EventEmitter();
  @Output() unLike: EventEmitter<any> = new EventEmitter();
  @Output() comment: EventEmitter<any> = new EventEmitter();

  comments$: Observable<any>;
  likes$: Observable<any>;

  likes: any[] = [];
  comments: any[] = [];

  isLoadingLikes: boolean = true;
  isLoadingComments: boolean = true;

  private _username: string = null;
  private _loadingUsername = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaProvider: MediaDataProvider,
              public userProvider: UserDataProvider,
              public modalCtrl: ModalController,
              private photoViewer: PhotoViewer,
              private thumbnailPipe: ThumbnailPipe,
              public loadingCtrl: LoadingController,
              private events: Events) {
  }

  ionViewDidLoad() {
  }

  public get liked() {
    if (this.likes != null && this.likes.length > 0 && UserSession.isLoggedIn) {
      let myLike: any[] = this.likes.filter(aLike => aLike.user_id == UserSession.userId);
      if (myLike.length != 0) {
          return true;
      }
    }
    return false;
  }

  public get username(): string {
    if (!UserSession.isLoggedIn) {
      return null;
    } else {
      if (this._username) {
        return this._username;
      } else {
        if (!this._loadingUsername) {
          this._loadingUsername = true;
          this.userProvider.requestUserInfoByUserId(this._mediaData.user_id).subscribe(res => {
            this._username = (res as any).username;
            this._loadingUsername = false;
          });
        }

      }
    }
    return null;
  }

  emitLikeEvent() {
    if (UserSession.isLoggedIn) {
      this.isLoadingLikes = true;
      this.mediaProvider.likeMediaFile(this._mediaData.file_id).subscribe(res => {
        this.mediaProvider.getLikesForMediaFile(this._mediaData.file_id).subscribe(response => {
          this.likes = response as any[];
          this.isLoadingLikes = false;
        });
      });
    } else {
      this.presentLoginView();
    }
    this.like.emit(this.mediaData);
  }

  emitUnLikeEvent() {
    this.unLike.emit(this.mediaData);
    this.mediaProvider.unlikeMediaFile(this._mediaData.file_id).subscribe(res => {
      this.mediaProvider.getLikesForMediaFile(this._mediaData.file_id).subscribe(res => {
        this.likes = res as any[];
        this.isLoadingLikes = false;
      });
    });
  }

  emitCommentEvent() {
    let commentModel = this.modalCtrl.create(CommentPage, this.mediaData);
    commentModel.present();
    this.comment.emit(this.mediaData);
  }

  emitDidDeleteMediaEvent() {
    this.events.publish(DidDeletePostEvent, this.mediaData);
  }

  // Helper methods
  private presentLoginView() {
    let loginModel = this.modalCtrl.create(LoginPage, {});
    loginModel.present();
  }

  likeCountingLabelClicked() {
    this.navCtrl.push(LikeListPage, this.likes);
  }

  usernameClicked() {
    this.navCtrl.push(UserProfilePage, this.mediaData);
  }

  displayPhotoViewer() {
    let imageURL = this.thumbnailPipe.transform(this.mediaData.filename, 'large');
    this.photoViewer.show(imageURL);
  }

  viewPhoto() {
    this.displayPhotoViewer();
  }

  deletePost() {
    if (this.isMyPost) {
      let deletingLoading = this.displayLoadingActivityIndicator("Deleting post...");
      deletingLoading.present();
      this.mediaProvider.deleteMediaFile(this.mediaData).subscribe(res => {
        deletingLoading.dismiss();
        this.emitDidDeleteMediaEvent();
        let successMessage = this.displayLoadingActivityIndicator("Deleted post successfully", 1000);
        successMessage.present();
      }, err => {
        deletingLoading.dismiss();
        let errorMessage = this.displayLoadingActivityIndicator("An error occur while deleting a post. Please try again", 1500);
        errorMessage.present();
      });
    }
  }

  public get isMyPost(): boolean {
    if (UserSession.isLoggedIn) {
      return this.mediaData.user_id == UserSession.userId;
    }

    return false;
  }

  // Activity Indicator
  // TODO: Refactor this so we can use everywhere
  private displayLoadingActivityIndicator(message: string, duration: number = 0) {
    let config: any = {content: message};

    if (duration != 0) {
      config.duration = duration;
      config.spinner = 'hide';
    }

    let loading = this.loadingCtrl.create(config);

    return loading;
  }
}
