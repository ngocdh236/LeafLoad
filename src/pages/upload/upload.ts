import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, Events, LoadingController} from 'ionic-angular';
import {MediaDataProvider} from "../../providers/media-data/media-data";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {UserSession} from "../../app/UserSession";
import {normalizeURL} from 'ionic-angular';

const UserLoggedInEvent = "UserLoggedInEvent";
const UserDidUploadMediaEvent = "UserDidUploadMediaEvent";

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  @ViewChild('uploadLayout') content;
  public base64Image: string;

  public get isUserLoggedIn(): boolean {
    return UserSession.isLoggedIn;
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              public mediaProvider: MediaDataProvider,
              public platform: Platform,
              public events: Events,
              public loadingCtrl: LoadingController) {
    events.subscribe(UserLoggedInEvent, () => {
      this.content.resize();
    });
  }

  ionViewDidLoad() {

  }

  media: any = {
    title: '',
    description: '',
    file: null
  };

  uploadMedia() {
    // Show uploading message
    let uploadingLoading = this.displayLoadingActivityIndicator("Uploading post...");
    uploadingLoading.present();

    this.mediaProvider.uploadMediaFile(this.media).then((data) => {
      setTimeout(() => {

        // Clean up the form
        this.base64Image = null;
        this.media = {
          title: '',
          description: '',
          file: null
        };
        uploadingLoading.dismiss();
        this.events.publish(UserDidUploadMediaEvent, {});
      }, 4000);
    }, (err) => {
      uploadingLoading.dismiss();
      let errorMessage = this.displayLoadingActivityIndicator("An error occur while uploading post. Please try again", 1500);
      errorMessage.present();
    });

  }

  selectCamera() {
    this.camera.cleanup();
    const options: CameraOptions = {
      quality: 75,
      targetWidth: 720,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

      this.media.file = imageData;
      let image;
      //get photo from the camera based on platform type
      if (this.platform.is('ios'))
        image = normalizeURL(imageData);
      else
        image = "data:image/jpeg;base64," + imageData;
      // Avoid ImageCache
      this.base64Image = image + '?' + Math.random();
      console.log(this.base64Image);
      console.log(imageData);

    }, (error) => {
      console.debug("Unable to obtain picture: " + error, "app");
      console.log(error);
    });
  }

  selectGallery() {
    this.camera.cleanup();
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 70,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }

    this.camera.getPicture(cameraOptions).then((file_uri) => {

      this.media.file = file_uri;
      let image;
      //get photo from the camera based on platform type
      if (this.platform.is('ios'))
        image = normalizeURL(file_uri);
      else
        image = "data:image/jpeg;base64," + file_uri;
      // Avoid ImageCache
      this.base64Image = image + '?' + Math.random();
      console.log(this.base64Image);
      console.log(file_uri);

    }, (error) => {


    });
  }

  onLogin(ev: any) {
    this.content.resize();
  }

  onSignUp(event: any) {

  }

  onSkip(ev: any) {

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
}
