import {Component, Input} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
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
              public mediaDataProvider: MediaDataProvider,
              public loadingCtrl: LoadingController,
              public viewController: ViewController) {
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
    let updateLoading = this.displayLoadingActivityIndicator("Updating information...");
    updateLoading.present();

    this.mediaDataProvider.updateFileInfo(this.media.file_id, this.media).subscribe(res => {
      this.dismiss();
    }, err => {
      updateLoading.dismiss();
      let errorMessage = this.displayLoadingActivityIndicator("An error occur while editing post. Please try again", 1500);
      errorMessage.present();
    });

    updateLoading.dismiss();
  }

  private displayLoadingActivityIndicator(message: string, duration: number = 0) {
    let config: any = {content: message};

    if (duration != 0) {
      config.duration = duration;
      config.spinner = 'hide';
    }

    let loading = this.loadingCtrl.create(config);

    return loading;
  }

  dismiss() {
    this.viewController.dismiss();
  }
}
