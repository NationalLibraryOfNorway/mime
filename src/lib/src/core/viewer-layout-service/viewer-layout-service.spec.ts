import { TestBed, inject } from '@angular/core/testing';
import { ObservableMedia } from '@angular/flex-layout';

import { ViewerLayout } from '../models/viewer-layout';
import { ViewerLayoutService } from './viewer-layout-service';
import { MimeViewerConfig } from '../mime-viewer-config';
import { MediaServiceStub } from '../../test/media-service-stub';

describe('ViewerLayoutService', () => {
  let config: MimeViewerConfig;
  beforeEach(() => {
    config = new MimeViewerConfig();
    TestBed.configureTestingModule({
      providers: [ViewerLayoutService, { provide: ObservableMedia, useClass: MediaServiceStub }]
    });
  });

  it(
    'should be created',
    inject([ViewerLayoutService], (service: ViewerLayoutService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should emit when ViewerLayout is toggled',
    inject([ViewerLayoutService], (service: ViewerLayoutService) => {
      let newLayout: ViewerLayout;
      service.onChange.subscribe((state: ViewerLayout) => (newLayout = state));
      service.setLayout(ViewerLayout.ONE_PAGE);
      expect(newLayout).toEqual(ViewerLayout.ONE_PAGE);
      service.setLayout(ViewerLayout.TWO_PAGE);
      expect(newLayout).toEqual(ViewerLayout.TWO_PAGE);
    })
  );

  it(
    'should set initial layout to specified layout in mime-config',
    inject([ViewerLayoutService, ObservableMedia], (service: ViewerLayoutService, media: ObservableMedia) => {
      const initLayout = config.initViewerLayout;
      spyOn(media, 'isActive').and.returnValue(false);
      service.init();

      if (initLayout === ViewerLayout.TWO_PAGE) {
        expect(service.layout === ViewerLayout.TWO_PAGE);
      }
      if (initLayout === ViewerLayout.ONE_PAGE) {
        expect(service.layout === ViewerLayout.ONE_PAGE);
      }
    })
  );

  it(
    'should set initial layout to ONE_PAGE on mobile, regardless of mime-config',
    inject([ViewerLayoutService, ObservableMedia], (service: ViewerLayoutService, media: ObservableMedia) => {
      spyOn(media, 'isActive').and.returnValue(true);
      service.init();
      expect(service.layout).toEqual(ViewerLayout.ONE_PAGE);
    })
  );

  it(
    'should set initial layout to TWO_PAGE if manifest is paged AND we are not and mobile',
    inject([ViewerLayoutService, ObservableMedia], (service: ViewerLayoutService, media: ObservableMedia) => {
      spyOn(media, 'isActive').and.returnValue(false);
      service.init(true);
      expect(service.layout).toEqual(ViewerLayout.TWO_PAGE);
    })
  );
});
