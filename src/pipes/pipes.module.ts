import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { CreatedDatePipe } from './created-date/created-date';
@NgModule({
	declarations: [ThumbnailPipe,
    CreatedDatePipe],
	imports: [],
	exports: [ThumbnailPipe,
    CreatedDatePipe]
})
export class PipesModule {}
