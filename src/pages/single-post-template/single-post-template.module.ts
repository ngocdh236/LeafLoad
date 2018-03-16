import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SinglePostTemplatePage } from './single-post-template';

@NgModule({
  declarations: [
    SinglePostTemplatePage,
  ],
  imports: [
    IonicPageModule.forChild(SinglePostTemplatePage),
  ],
})
export class SinglePostTemplatePageModule {}
