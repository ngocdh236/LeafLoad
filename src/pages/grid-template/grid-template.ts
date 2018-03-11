import { Component, Input, Output, EventEmitter} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GridTemplatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grid-template',
  templateUrl: 'grid-template.html',
})
export class GridTemplatePage {

  @Input() mediaArray: any[] = [];
  @Output() didSelectItem: EventEmitter<any> = new EventEmitter();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  selectItemAtIndex(index: number) {
    let item = this.mediaArray[index];
    this.didSelectItem.emit(item);
  }

}
