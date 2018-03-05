import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, Events } from 'ionic-angular';
import { MediaDataProvider } from "../../providers/media-data/media-data";
import { PostTemplatePage } from "../post-template/post-template";

const DidDeletePostEvent = "DidDeletePostEvent";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mediaArray: any[] = [];
  currentPage = 0;
  numberOfFilesPerRequest = 10;
  infiniteScroll: any;
  currentFile_id: number;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public mediaData: MediaDataProvider, private events: Events) {
    this.currentPage = 0;
    this.mediaArray = [];

    events.subscribe(DidDeletePostEvent, (mediaFile) => {
      this.didDeleteMediaFile(mediaFile);
    });
  }

  ionViewDidLoad() {
    this.loadMediaFiles(this.currentPage, null);
  }

  loadMediaFiles(page: number, completionHandler: ((succeeded: boolean) => void) = null) {
    this.mediaData.getMediaFiles(page, this.numberOfFilesPerRequest).subscribe(res => {

      if (completionHandler) {
        completionHandler(true);
      }

      const newFiles: any = res;
      newFiles.map(media => {
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
    this.loadMediaFiles(this.currentPage, null);
  }

  like(event: any) {
  }

  comment(event: any) {
  }

  doRefresh(refresher) {
    // Load the first page (page number 0) of 10 items.
    this.loadMediaFiles(0, (succeeded) => {
      if (succeeded) {
        this.currentPage = 0;
        this.mediaArray = [];
      }

      refresher.complete();
    });
  }

  // TODO: Refactor this. This seems an heavy operation.
  private didDeleteMediaFile(ev: any) {
    for (let i = 0; i < this.mediaArray.length ; i++) {
      if (this.mediaArray[i].file_id == ev.file_id) {

        this.mediaArray.splice(i, 1);
      }
    }
    this.mediaArray = this.mediaArray;
  }
}
