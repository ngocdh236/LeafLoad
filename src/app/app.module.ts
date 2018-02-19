import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler, NavController} from 'ionic-angular';
import { MyApp } from './app.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from "./interceptors/token.interceptor";

import {ProfilePage} from "../pages/profile/profile";
import {UploadPage} from "../pages/upload/upload";
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import { UserDataProvider } from '../providers/user-data/user-data';
import { MediaDataProvider } from '../providers/media-data/media-data';
import {HttpClientModule} from "@angular/common/http";
import {SignupPage} from "../pages/signup/signup";
import {SearchPage} from "../pages/search/search";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UploadPage,
    ProfilePage,
    TabsPage,
    LoginPage,
    SignupPage,
    SearchPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    UploadPage,
    TabsPage,
    LoginPage,
    SignupPage,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    UserDataProvider,
    MediaDataProvider,
  ]
})
export class AppModule {}
