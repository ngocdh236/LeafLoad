import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { MediaDataProvider } from "../../providers/media-data/media-data";

const DidDeletePostEvent = "DidDeletePostEvent";
const UserDidUploadMediaEvent = "UserDidUploadMediaEvent";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mediaArray: any[] = [];
  currentPage = 0;
  numberOfFilesPerRequest = 10;
  infiniteScroll: any;

  constructor(public navCtrl: NavController,
              public mediaData: MediaDataProvider,
              private events: Events) {
    this.currentPage = 0;
    this.mediaArray = [];

    this.events.subscribe(DidDeletePostEvent, (mediaFile) => {
      this.didDeleteMediaFile(mediaFile);
    });

    events.subscribe(UserDidUploadMediaEvent, () => {
      this.doRefresh(null);
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

      if (refresher) {
        refresher.complete();
      }
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
