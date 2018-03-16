import { Component, ViewChild } from '@angular/core';
import { HomePage } from '../home/home';
import { UploadPage } from "../upload/upload";
import { ProfilePage } from "../profile/profile";
import { SearchPage } from "../search/search";
import { Events, NavController, Tabs } from "ionic-angular";

const UserDidUploadEvent = "UserDidUploadEvent";
const UserDidUploadMediaEvent = "UserDidUploadMediaEvent";

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  @ViewChild('myNav') nav: NavController;
  @ViewChild(Tabs) tabs;
  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = UploadPage;
  tab4Root = ProfilePage;

  constructor(public events: Events) {
    events.subscribe(UserDidUploadEvent, () => {
      this.nav.push(this.tab1Root);
    });

    events.subscribe(UserDidUploadMediaEvent, () => {
      this.tabs.select(0);
    });
  }
}
