import { async, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SearchResult } from '../../models/search-result';
import { Hit } from '../../models/hit';
import { MimeViewerIntl } from '../../intl/viewer-intl';
import { ViewerService } from '../../viewer-service/viewer.service';
import { IiifContentSearchService } from '../../iiif-content-search-service/iiif-content-search.service';
import { PageService } from '../../page-service/page-service';
import { ContentSearchNavigationService } from './content-search-navigation.service';
import { testManifest } from '../../../test/testManifest';
import { IiifContentSearchServiceStub } from '../../../test/iiif-content-search-service-stub';
import { IiifManifestServiceStub } from '../../../test/iiif-manifest-service-stub';
import { IiifManifestService } from '../../iiif-manifest-service/iiif-manifest-service';
import { Rect } from '../../models/rect';
import { ViewerLayout } from '../../models/viewer-layout';
import { ViewerServiceStub } from '../../../test/viewer-service-stub';

describe('ContentSearchNavigationService', () => {
  let iiifContentSearchServiceStub: IiifContentSearchServiceStub;
  let iiifManifestServiceStub: IiifManifestServiceStub;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [],
        providers: [
          ContentSearchNavigationService,
          MimeViewerIntl,
          PageService,
          { provide: ViewerService, useClass: ViewerServiceStub },
          { provide: IiifManifestService, useClass: IiifManifestServiceStub },
          { provide: IiifContentSearchService, useClass: IiifContentSearchServiceStub }
        ]
      });
    })
  );

  beforeEach(
    inject(
      [ContentSearchNavigationService, HttpTestingController, IiifContentSearchService, PageService],
      fakeAsync(
        (
          csns: ContentSearchNavigationService,
          httpMock: HttpTestingController,
          icss: IiifContentSearchService,
          pageService: PageService
        ) => {
          iiifContentSearchServiceStub = TestBed.get(IiifContentSearchService);
          iiifManifestServiceStub = TestBed.get(IiifManifestService);
          iiifManifestServiceStub._currentManifest.next(testManifest);
          iiifContentSearchServiceStub._currentSearchResult.next(createSearchResult());
          pageService.addPages(createPages(), ViewerLayout.ONE_PAGE, false);
        }
      )
    )
  );

  it(
    'should create',
    inject([ContentSearchNavigationService], (service: ContentSearchNavigationService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should go to next index',
    inject(
      [ContentSearchNavigationService],
      fakeAsync((csns: ContentSearchNavigationService) => {
        csns.update(5);
        expect(csns.getCurrentIndex()).toBe(2);

        csns.goToNextHitPage();
        expect(csns.getCurrentIndex()).toBe(3);
      })
    )
  );

  it(
    'should go to previous index',
    inject(
      [ContentSearchNavigationService],
      fakeAsync((csns: ContentSearchNavigationService) => {
        csns.update(4);
        expect(csns.getCurrentIndex()).toBe(1);

        csns.goToPreviousHitPage();
        expect(csns.getCurrentIndex()).toBe(0);
      })
    )
  );

  it(
    'should return -1 if canvasIndex is before first hit',
    inject(
      [ContentSearchNavigationService],
      fakeAsync((csns: ContentSearchNavigationService) => {
        csns.update(1);
        expect(csns.getCurrentIndex()).toBe(-1);
      })
    )
  );

  it(
    'should return 0 if canvasIndex is on first hit',
    inject(
      [ContentSearchNavigationService],
      fakeAsync((csns: ContentSearchNavigationService) => {
        csns.update(2);
        expect(csns.getCurrentIndex()).toBe(0);
      })
    )
  );

  it(
    'should return 0 if canvasIndex is between first and second hit',
    inject(
      [ContentSearchNavigationService],
      fakeAsync((csns: ContentSearchNavigationService) => {
        csns.update(3);
        expect(csns.getCurrentIndex()).toBe(0);
      })
    )
  );

  it(
    'should return 2 if canvasIndex is between second and fourth hit',
    inject(
      [ContentSearchNavigationService],
      fakeAsync((csns: ContentSearchNavigationService) => {
        csns.update(6);
        expect(csns.getCurrentIndex()).toBe(2);
      })
    )
  );

  it(
    'should return 3 if canvasIndex is after last',
    inject(
      [ContentSearchNavigationService],
      fakeAsync((csns: ContentSearchNavigationService) => {
        csns.update(10);
        expect(csns.getCurrentIndex()).toBe(3);
      })
    )
  );

  function createPages(): Rect[] {
    const pages: Rect[] = [];
    for (let i = 0; i < 100; i++) {
      pages.push(new Rect());
    }
    return pages;
  }

  function createSearchResult(): SearchResult {
    return new SearchResult({
      hits: [new Hit({ index: 2 }), new Hit({ index: 4 }), new Hit({ index: 5 }), new Hit({ index: 8 })]
    });
  }
});
