import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { MediaDataProvider } from "../../providers/media-data/media-data";
import {UserDataProvider} from "../../providers/user-data/user-data";

/**
 * Generated class for the PostTemplatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  @Input() thinh:  string;
  @Input()
  set mediaData(mediaData: any) {
    this._mediaData = mediaData;
    this.comments$ = this.mediaProvider.getCommentsForFile(this._mediaData.file_id);
    this.likes$ = this.mediaProvider.getLikesForMediaFile(this._mediaData.file_id);
    this.mediaProvider.getCommentsForFile(this._mediaData.file_id).subscribe(res => {
      this.comments = res as any[];
      this.isLoadingComments = false;
    });
    this.mediaProvider.getLikesForMediaFile(this._mediaData.file_id).subscribe(res => {
      this.likes = res as any[];
      this.isLoadingLikes = false;
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaDataProvider, public userProvider: UserDataProvider) {
  }

  ionViewDidLoad() {
    console.log(`Thinh: ${this.thinh}`);
  }

  public get liked() {
    if (this.likes != null && this.likes.length > 0) {
      let myLike: any[] = this.likes.filter(aLike => aLike.user_id == 27);
      if (myLike.length != 0) {
          return true;
      }
    }
    return false;
  }

  emitLikeEvent() {
    this.isLoadingLikes = true;
    this.like.emit(this.mediaData);
    this.mediaProvider.likeMediaFile(this._mediaData.file_id).subscribe(res => {
      this.mediaProvider.getLikesForMediaFile(this._mediaData.file_id).subscribe(response => {
        this.likes = response as any[];
        this.isLoadingLikes = false;
      });
    });
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
    this.comment.emit(this.mediaData);
  }
}
