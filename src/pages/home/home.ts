import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { MediaDataProvider } from "../../providers/media-data/media-data";
import { PostTemplatePage } from "../post-template/post-template";
import { CommentPage } from "../comment/comment";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mediaArray: any[] = [];
  currentPage = 0;
  numberOfFilesPerRequest = 10;
  infiniteScroll: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public mediaData: MediaDataProvider) {
    this.currentPage = 0;
    this.mediaArray = [];
  }

  ionViewDidLoad() {
    this.loadMediaFiles(this.currentPage);
  }

  loadMediaFiles(page: number) {
    this.mediaData.getMediaFiles(this.currentPage, this.numberOfFilesPerRequest).subscribe(res => {
      console.log(res);
      const newFiles: any = res;
      newFiles.map(media => {
        const temp = media.filename.split('.');
        const thumbName = temp[0] + '-tn320.png';
        media.thumbnail = this.mediaData.mediaURL + thumbName;
        this.mediaArray.push(media);
      });

      // Increase the current page index
      this.currentPage += 1;

      // Complete the the scrolling indicator
      if (this.infiniteScroll != null) {
        this.infiniteScroll.complete();
      }

      // TODO: Find a way to cancel the infinite scroll when there is no more photo to load. Otherwise it keeps making unnecessary requests.
    });
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.loadMediaFiles(this.currentPage);
  }

  like(event: any) {

  }

  comment(event: any) {
    let profileModel = this.modalCtrl.create(CommentPage, event);
    profileModel.present();
  }

}
