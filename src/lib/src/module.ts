import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MimeMaterialModule } from './mime-material.module';
import { ViewerComponent } from './viewer/viewer.component';
import { IiifService } from './core/iiif-service/iiif-service';
import { Options } from './core/models/options';
import { ViewerBuilder } from './core/builders/viewer.builder';

import './rxjs-extension';
import 'openseadragon';

@NgModule({
  declarations: [
    ViewerComponent
  ],
  imports: [
    FlexLayoutModule,
    MimeMaterialModule
  ],
  exports: [
    FlexLayoutModule,
    MimeMaterialModule,
    ViewerComponent
  ],
  providers: [
    IiifService,
  ]
})
export class MimeModule {
  constructor(
    @Optional() @SkipSelf() parentModule: MimeModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
