import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProfileTemplatePage } from './user-profile-template';

@NgModule({
  declarations: [
    UserProfileTemplatePage,
  ],
  imports: [
    IonicPageModule.forChild(UserProfileTemplatePage),
  ],
})
export class UserProfileTemplatePageModule {}
