import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaDataProvider} from "../../providers/media-data/media-data";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaData: MediaDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  onInput(ev: any) {
    console.log("typing something...");
    let keyword = ev.target.value;
    if (keyword && keyword.trim() !== '') {
      this.mediaData.searchMediaFiles(keyword).subscribe(res => {
        console.log(res);
      }, (error) => {
        console.log(error);
      });
    } else {
      // Revert search result

    }
  }

  onCancel(ev: any) {
    console.log("On cancel");
  }

}
