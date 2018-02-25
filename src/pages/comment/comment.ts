import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/index';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MediaDataProvider } from "../../providers/media-data/media-data";

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  comments: any;

  comments$: Observable<any[]>;
  comment: string;

  mediaFile: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewController: ViewController, public loadingController: LoadingController, public mediaProvider: MediaDataProvider) {
    this.mediaFile = navParams.data;
  }

  ionViewDidLoad() {
    this.comments$ = of(this.comments);
    let loading = this.loadingController.create({content: 'Loading comments...', spinner: 'ios'});
    loading.present();

    this.mediaProvider.getCommentsForFile(this.mediaFile.file_id).subscribe(res => {
      this.comments = res;
      loading.dismiss();
    });
  }

  dismiss() {
    this.viewController.dismiss();
  }

  submitComment() {
    if (this.comment && this.comment.trim() !== '') {

      // Show loading
      let loading = this.loadingController.create({content: 'Posting comment...', spinner: 'ios'});
      loading.present();
      // Scroll to bottom
      // TODO: Scroll to bottom if neccessary

      // Send to service
      this.mediaProvider.createCommentToMediaFile(this.comment, this.mediaFile).subscribe(res =>{
        // TODO: Error-handler should be trigger in the service itself
        loading.dismiss();
        this.comments.push({comment: this.comment});
      });
    }
  }
}
