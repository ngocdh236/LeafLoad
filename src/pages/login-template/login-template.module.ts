import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginTemplatePage } from './login-template';

@NgModule({
  declarations: [
    LoginTemplatePage,
  ],
  imports: [
    IonicPageModule.forChild(LoginTemplatePage),
  ],
})
export class LoginTemplatePageModule {}
