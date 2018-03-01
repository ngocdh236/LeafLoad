import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListTemplatePage } from './list-template';

@NgModule({
  declarations: [
    ListTemplatePage,
  ],
  imports: [
    IonicPageModule.forChild(ListTemplatePage),
  ],
})
export class ListTemplatePageModule {}
