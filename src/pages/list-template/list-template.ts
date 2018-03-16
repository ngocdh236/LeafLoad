import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

/**
 * Generated class for the ListTemplatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-template',
  templateUrl: 'list-template.html',
})

export class ListTemplatePage<Model> {
  @ViewChild (Content) content;

  private _items: string[] = [];
  private parsed: boolean = false;

  public get items(): string[] {
    if (this._items.length == 0 && !this.parsed) {
      // Do the parsing
      this._items = this.dataList.map(item => {
      const parsedItem = this.parse(item);
      return parsedItem;
    });
      this.parsed = true;
    }

    return this._items;
  };

  @Input() dataList: Model[] = [];

  parse: (x: Model) => string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.content.resize();
  }

}
