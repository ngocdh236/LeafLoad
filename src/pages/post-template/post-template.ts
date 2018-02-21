import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  @Input() mediaData: any;

  @Output() like: EventEmitter<any> = new EventEmitter();
  @Output() comment: EventEmitter<any> = new EventEmitter();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  emitLikeEvent() {
    this.like.emit(this.mediaData);
  }

  emitCommentEvent() {
    this.comment.emit(this.mediaData);
  }
}
