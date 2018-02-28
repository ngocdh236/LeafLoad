import { Component, ViewChild, ComponentFactoryResolver, ComponentFactory, ComponentRef, ViewContainerRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { ListTemplatePage } from "../list-template/list-template";
import { UserProfilePage } from "../user-profile/user-profile";
import { UserDataProvider } from "../../providers/user-data/user-data";
import { Like } from "../../interfaces/Like";
import { User } from "../../interfaces/User";

/**
 * Generated class for the LikeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-like-list',
  templateUrl: 'like-list.html',
})

export class LikeListPage {

  private _likes: Like[];
  likers: any[] = [];
  public isLoading: boolean;

  // @ViewChild(Content, { read: ViewContainerRef }) container;
  @ViewChild(Content) content;


  constructor(public navCtrl: NavController, public navParams: NavParams, private resolver: ComponentFactoryResolver, private userDataProvider: UserDataProvider ) {
    this._likes = this.navParams.data;
  }

  ionViewDidLoad() {
    this.downloadListOfLikers();
    // this.displayListOfLikers();
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

<<<<<<< HEAD
  usernameClicked() {
    this.navCtrl.push(UserProfilePage, {});
=======
  usernameClicked(index: number) {
    let liker = this.likers[index];
    this.navCtrl.push(UserProfilePage, liker);
>>>>>>> 66b290a3e7ffa9e81638fb3d9fbd85aeb7210ef9
  }

  // private displayListOfLikers() {
  //   this.container.clear();
  //   const factory = this.resolver.resolveComponentFactory(ListTemplatePage);
  //   this.listView = this.container.createComponent(factory);
  //   this.listView.instance.dataList = this.likers;
  //   this.listView.instance.parse = function(user) { return user.username };
  //   this.content.resize();
  // }

}
