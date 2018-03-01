import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler, NavController} from 'ionic-angular';
import { MyApp } from './app.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from "./interceptors/token.interceptor";

import { ProfilePage } from "../pages/profile/profile";
import { UploadPage } from "../pages/upload/upload";
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CommentPage } from "../pages/comment/comment";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import { UserDataProvider } from '../providers/user-data/user-data';
import { MediaDataProvider } from '../providers/media-data/media-data';
import {HttpClientModule} from "@angular/common/http";
import {SignupPage} from "../pages/signup/signup";
import {SearchPage} from "../pages/search/search";
import { LoginTemplatePage } from "../pages/login-template/login-template";
import { PostTemplatePage } from "../pages/post-template/post-template";
import { ThumbnailPipe } from "../pipes/thumbnail/thumbnail";
import {ModifyUserDataPage} from "../pages/modify-user-data/modify-user-data";
import {PhotoLibrary} from "@ionic-native/photo-library";
import {CreatedDatePipe} from "../pipes/created-date/created-date";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";


@NgModule({
  declarations: [
    MyApp,
    ThumbnailPipe,
    HomePage,
    UploadPage,
    ProfilePage,
    TabsPage,
    LoginPage,
    SignupPage,
    SearchPage,
    LoginTemplatePage,
    PostTemplatePage,
    CommentPage,
    ModifyUserDataPage,
    CreatedDatePipe
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
    SearchPage,
    LoginTemplatePage,
    PostTemplatePage,
    CommentPage,
    ModifyUserDataPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    UserDataProvider,
    MediaDataProvider,
    PhotoLibrary,

  ]
})
export class AppModule {}
