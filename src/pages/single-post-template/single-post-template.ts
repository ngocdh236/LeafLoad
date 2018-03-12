import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-single-post-template',
  templateUrl: 'single-post-template.html',
})
export class SinglePostTemplatePage {
  mediaData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let data = navParams.data;
    console.log(navParams.data);
    if (data) {
      this.mediaData = data;
    }
  }
}
