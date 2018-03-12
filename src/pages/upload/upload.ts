import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { MediaDataProvider } from "../../providers/media-data/media-data";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpErrorResponse } from "@angular/common/http";
import { UserSession } from "../../app/UserSession";
import { normalizeURL } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  public base64Image: string;

  public get isUserLoggedIn(): boolean {
    return UserSession.isLoggedIn;
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              public mediaProvider: MediaDataProvider,
              public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  media: any = {
    title: '',
    description: '',
    file: null
  };

  uploadMedia() {
    this.mediaProvider.uploadMediaFile(this.media).then((data) => {
      // Show success message

      // Clean up the form

    }, (err) => {
      // SHow error message
    });
  }

  selectCamera() {

    const options: CameraOptions = {
      //this.platform.is('ios') ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
      quality: 75,
      targetWidth:720,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

      this.media.file = imageData;

      //get photo from the camera based on platform type
      if (this.platform.is('ios'))
        this.base64Image = normalizeURL(imageData);
      else
        this.base64Image = "data:image/jpeg;base64," + imageData;

    }, (error) => {
      console.debug("Unable to obtain picture: " + error, "app");
      console.log(error);
    });
  }

  selectGallery() {
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

      //get photo from the camera based on platform type
      if (this.platform.is('ios'))
        this.base64Image = normalizeURL(file_uri);
      else
        this.base64Image = "data:image/jpeg;base64," + file_uri;

    }, (error) => {
      console.debug("Unable to obtain picture: " + error, "app");
      console.log(error);
    });
  }
}
