import { TestBed, inject } from '@angular/core/testing';

import { SharedModule } from './../shared/shared.module';
import { AttributionDialogService } from './attribution-dialog.service';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';

describe('AttributionDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      providers: [
        AttributionDialogService,
        MimeResizeService
      ]
    });
  });

  it('should be created', inject([AttributionDialogService], (service: AttributionDialogService) => {
    expect(service).toBeTruthy();
  }));
});
