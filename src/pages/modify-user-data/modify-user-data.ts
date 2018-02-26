import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the ModifyUserDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-user-data',
  templateUrl: 'modify-user-data.html',
})
export class ModifyUserDataPage {

  constructor(public navCtrl: NavController, public viewController: ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyUserDataPage');
  }

  dismiss() {
    this.viewController.dismiss();
  }

}
