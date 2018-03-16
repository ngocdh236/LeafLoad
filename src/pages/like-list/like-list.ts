import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { UserProfilePage } from "../user-profile/user-profile";
import { UserDataProvider } from "../../providers/user-data/user-data";
import { Like } from "../../interfaces/Like";

@IonicPage()
@Component({
  selector: 'page-like-list',
  templateUrl: 'like-list.html',
})

export class LikeListPage {

  private _likes: Like[];
  likers: any[] = [];
  public isLoading: boolean;

  @ViewChild(Content) content;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userDataProvider: UserDataProvider ) {
    this._likes = this.navParams.data;
  }

  ionViewDidLoad() {
    this.downloadListOfLikers();
  }

  private downloadListOfLikers() {
    this.isLoading = true;
    let remainingLikers = this._likes.length;
    for (let like of this._likes) {
      this.userDataProvider.requestUserInfoByUserId(like.user_id).subscribe(res => {
        this.likers.push(res);
        remainingLikers -= 1;
        if (remainingLikers == 0) {
          this.isLoading = false;
        }
      });
    }
  }

  usernameClicked(index: number) {
    let liker = this.likers[index];
    this.navCtrl.push(UserProfilePage, liker);
  }

}
