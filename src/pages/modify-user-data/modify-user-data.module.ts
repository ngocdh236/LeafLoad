import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyUserDataPage } from './modify-user-data';

@NgModule({
  declarations: [
    ModifyUserDataPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyUserDataPage),
  ],
})
export class ModifyUserDataPageModule {}
