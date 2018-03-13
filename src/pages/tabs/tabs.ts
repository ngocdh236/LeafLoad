import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { UploadPage } from "../upload/upload";
import { ProfilePage } from "../profile/profile";
import { SearchPage } from "../search/search";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = UploadPage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
