import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginTemplatePage } from "../pages/login-template/login-template";

const FirstLaunchKey: string = 'LeafLoafFirstLaunch';
const UserLoggedInEvent = "UserLoggedInEvent";
const LoginTemplatePageSkipTappedEvent = "LoginTemplatePageSkipTappedEvent";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private events: Events) {
    platform.ready().then(() => {
      let firstLaunch = localStorage.getItem(FirstLaunchKey);

      if (!firstLaunch) {
        this.rootPage = LoginTemplatePage;
      } else {
        this.rootPage = TabsPage;
      }

      statusBar.styleDefault();
      splashScreen.hide();

      // Register Events
      this.events.subscribe(LoginTemplatePageSkipTappedEvent, () => {
        this.rootPage = TabsPage;
        localStorage.setItem(FirstLaunchKey, FirstLaunchKey);
      });

      events.subscribe(UserLoggedInEvent, () => {
        let loginPage = this.rootPage as LoginTemplatePage;
        if (loginPage) {
          this.rootPage = TabsPage;
          localStorage.setItem(FirstLaunchKey, FirstLaunchKey);
        }
      });
    });
  }


}
