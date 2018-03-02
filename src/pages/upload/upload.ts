import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { MediaDataProvider } from "../../providers/media-data/media-data";
import { Media } from "../../interfaces/Media";
import {Camera, CameraOptions} from "@ionic-native/camera";

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  // mediaArray: any;
  public base64Image: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              public mediaProvider: MediaDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  media: Media = {
    file: null,
    title: '',
    description: ''
  };

  setFile(evt) {
    console.log(evt.target.files);
    this.media.file = evt.target.files[0];
  }

  openCamera() {
    const options: CameraOptions = {
      // targetWidth: 1000,
      // targetHeight: 1000,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  openGallery() {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  uploadMedia(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append('title', this.media.title);
    formData.append('description', this.media.description);
    formData.append('file', this.media.file);

    this.mediaProvider.uploadMedia(formData).subscribe(response => {
      console.log(response);
    });
  }
}
