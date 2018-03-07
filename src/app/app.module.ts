import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler, NavController} from 'ionic-angular';
import { MyApp } from './app.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { UnAuthorizedRequestInterceptor } from "./interceptors/unauthorized-request.interceptor";

import { ProfilePage } from "../pages/profile/profile";
import { UploadPage } from "../pages/upload/upload";
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CommentPage } from "../pages/comment/comment";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login";
import { UserDataProvider } from '../providers/user-data/user-data';
import { MediaDataProvider } from '../providers/media-data/media-data';
import { HttpClientModule} from "@angular/common/http";
import { SignupPage } from "../pages/signup/signup";
import { SearchPage } from "../pages/search/search";
import { LoginTemplatePage } from "../pages/login-template/login-template";
import { PostTemplatePage } from "../pages/post-template/post-template";
import { ThumbnailPipe } from "../pipes/thumbnail/thumbnail";
import { ModifyUserDataPage } from "../pages/modify-user-data/modify-user-data";
import { PhotoLibrary } from "@ionic-native/photo-library";
import { ListTemplatePage } from "../pages/list-template/list-template";
import { LikeListPage } from '../pages/like-list/like-list';
import { UserProfilePage } from "../pages/user-profile/user-profile";
import {CreatedDatePipe} from "../pipes/created-date/created-date";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {FileTransfer} from "@ionic-native/file-transfer";
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { GridTemplatePage } from "../pages/grid-template/grid-template";
import { SinglePostTemplatePage } from "../pages/single-post-template/single-post-template";
import {UpdateFileInfoPage} from "../pages/update-file-info/update-file-info";

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
    CreatedDatePipe,
    ListTemplatePage,
    LikeListPage,
    UserProfilePage,
    GridTemplatePage,
    SinglePostTemplatePage,
    UpdateFileInfoPage
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
    ListTemplatePage,
    LikeListPage,
    UserProfilePage,
    GridTemplatePage,
    SinglePostTemplatePage,
    UpdateFileInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UnAuthorizedRequestInterceptor, multi: true},
    UserDataProvider,
    MediaDataProvider,
    PhotoLibrary,
    Camera,
    PhotoViewer,
    ThumbnailPipe
  ]
})
export class AppModule {}
