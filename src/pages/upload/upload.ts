import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PhotoLibrary} from '@ionic-native/photo-library';
import {MediaDataProvider} from "../../providers/media-data/media-data";
import {Media} from "../../interfaces/Media";
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer'

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private photoLibrary: PhotoLibrary, public mediaProvider: MediaDataProvider) {
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
    console.log(evt.target.files);
    this.media.file = evt.target.files[0];
  }

  // upload(fileEntry) {
  //   // !! Assumes variable fileURL contains a valid URL to a text file on the device,
  //   var fileURL = fileEntry.toURL();
  //
  //   var success = function (r) {
  //     console.log("Successful upload...");
  //     console.log("Code = " + r.responseCode);
  //     // displayFileData(fileEntry.fullPath + " (content uploaded to server)");
  //   }
  //
  //   var fail = function (error) {
  //     alert("An error has occurred: Code = " + error.code);
  //   }
  //
  //   var options = new FileUploadOptions();
  //   options.fileKey = "file";
  //   options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
  //   options.mimeType = "text/plain";
  //
  //   var params = {};
  //   params.value1 = "test";
  //   params.value2 = "param";
  //
  //   options.params = params;
  //
  //   var ft = new FileTransfer();
  //   // SERVER must be a URL that can handle the request, like
  //   // http://some.server.com/upload.php
  //   ft.upload(fileURL, encodeURI(SERVER), success, fail, options);
  // };

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
