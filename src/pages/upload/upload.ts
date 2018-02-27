import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PhotoLibrary} from '@ionic-native/photo-library';
import {MediaDataProvider} from "../../providers/media-data/media-data";
import {Media} from "../../interfaces/Media";
import { ImagePicker } from '@ionic-native/image-picker';

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

  mediaArray: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private photoLibrary: PhotoLibrary, public mediaProvider: MediaDataProvider, private imagePicker: ImagePicker) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
    // this.imagePicker.getPictures().then((results) => {
    //   for (var i = 0; i < results.length; i++) {
    //     console.log('Image URI: ' + results[i]);
    //   }
    // }, (err) => { });
  }

  media: Media = {
    file: null,
    title: '',
    description: ''
  };

  setFile(evt) {
    console.log(evt.target.files[0]);
    this.media.file = evt.target.files[0];
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
