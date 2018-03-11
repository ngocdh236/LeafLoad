import {Component, Input} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Media} from "../../interfaces/Media";
import {MediaDataProvider} from "../../providers/media-data/media-data";

@IonicPage()
@Component({
  selector: 'page-update-file-info',
  templateUrl: 'update-file-info.html',
})
export class UpdateFileInfoPage {
  private _mediaData: any;

  media: Media = {
    file_id: 0,
    title: '',
    description: ''
  }


  @Input()
  set mediaData(mediaData: any) {
    this._mediaData = mediaData;
  };

  public get shouldDisableUpdateButton(): boolean {
    return !this.isChanged;
  }

  public get isChanged(): boolean {
    let title = this.media.title.trim();
    let description = this.media.description.trim();

    if (title || description) {
      return this._mediaData.title !== title || this._mediaData.description !== description;
    }


    return false;
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaDataProvider: MediaDataProvider) {
    let file = navParams.data;
    console.log(`Data ${file}`);
    if (file) {
      this._mediaData = file;
      this.media.file_id = file.file_id;
      this.media.title = file.title;
      this.media.description = file.description;
    }

  }

  ionViewDidLoad() {
  }

  updateFileInfo() {
    this.mediaDataProvider.updateFileInfo(this.media.file_id, this.media).subscribe(res => {
      this.navCtrl.pop();
    });
  }
}
