import { Component, ViewChild, ComponentFactoryResolver, ComponentFactory, ComponentRef, ViewContainerRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { ListTemplatePage } from "../list-template/list-template";
import { UserDataProvider } from "../../providers/user-data/user-data";
import { Like } from "../../interfaces/Like";

/**
 * Generated class for the LikeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// TODO: Remove this by importing an in
terface
 interface User {
   user_id: number;
   username: string;
 }

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

  // private displayListOfLikers() {
  //   this.container.clear();
  //   const factory = this.resolver.resolveComponentFactory(ListTemplatePage);
  //   this.listView = this.container.createComponent(factory);
  //   this.listView.instance.dataList = this.likers;
  //   this.listView.instance.parse = function(user) { return user.username };
  //   this.content.resize();
  // }

}
