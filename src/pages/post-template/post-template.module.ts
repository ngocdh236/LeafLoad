import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostTemplatePage } from './post-template';

@NgModule({
  declarations: [
    PostTemplatePage,
  ],
  imports: [
    IonicPageModule.forChild(PostTemplatePage),
  ],
})
export class PostTemplatePageModule {}
