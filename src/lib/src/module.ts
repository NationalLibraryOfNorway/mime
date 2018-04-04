import { NgModule } from '@angular/core';
import 'openseadragon';
import 'd3';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ContentsDialogModule } from './contents-dialog/contents-dialog.module';
import { AttributionDialogModule } from './attribution-dialog/attribution-dialog.module';
import { ContentSearchDialogModule } from './content-search-dialog/content-search-dialog.module';
import { CanvasGroupDialogModule } from './canvas-group-dialog/canvas-group-dialog.module';
import { ViewerComponent } from './viewer/viewer.component';
import { ViewerHeaderComponent } from './viewer/viewer-header/viewer-header.component';
import { ViewerFooterComponent } from './viewer/viewer-footer/viewer-footer.component';
import { ContentSearchNavigatorComponent } from './viewer/viewer-footer/content-search-navigator/content-search-navigator.component';
import { CanvasGroupNavigatorComponent } from './viewer/viewer-footer/canvas-group-navigator/canvas-group-navigator.component';
import { ViewerSpinnerComponent } from './viewer/viewer-spinner/viewer-spinner.component';
import { OsdToolbarComponent } from './viewer/osd-toolbar/osd-toolbar.component';

@NgModule({
  declarations: [
    ViewerComponent,
    ViewerHeaderComponent,
    ViewerFooterComponent,
    OsdToolbarComponent,
    ContentSearchNavigatorComponent,
    CanvasGroupNavigatorComponent,
    ViewerSpinnerComponent
  ],
  imports: [CoreModule, SharedModule, ContentsDialogModule, AttributionDialogModule, ContentSearchDialogModule, CanvasGroupDialogModule],
  exports: [ViewerComponent]
})
export class MimeModule {}
