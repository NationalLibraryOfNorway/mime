import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ViewerService } from '../viewer-service/viewer.service';
import { PageService } from '../page-service/page-service';
import { ContentSearchDialogService } from '../../content-search-dialog/content-search-dialog.service';
import { ContentsDialogService } from '../../contents-dialog/contents-dialog.service';
import { ModeService } from '../mode-service/mode.service';
import { ViewerMode } from '../models/viewer-mode';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { Manifest } from '../models/manifest';
import { MimeDomHelper } from '../mime-dom-helper';
import { AccessKeys } from '../models/AccessKeys';
import { ContentSearchNavigationService } from '../navigation/content-search-navigation-service/content-search-navigation.service';
import { IiifContentSearchService } from '../iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from '../../core/models/search-result';

@Injectable()
export class AccessKeysService implements OnDestroy {
  private isLetterKeysEnabled = true;
  private isSearchable = false;
  private subscriptions: Array<Subscription> = [];
  private isSearchDialogOpen = false;
  private hasHits = false;

  constructor(
    private viewerService: ViewerService,
    private pageService: PageService,
    private modeService: ModeService,
    private iiifManifestService: IiifManifestService,
    private iiifContentSearchService: IiifContentSearchService,
    private contentSearchDialogService: ContentSearchDialogService,
    private contentsDialogService: ContentsDialogService,
    private mimeDomHelper: MimeDomHelper,
    private contentSearchNavigationService: ContentSearchNavigationService
  ) {
    this.subscriptions.push(
      this.contentSearchDialogService.isContentSearchDialogOpen.subscribe((open: boolean) => {
        this.isLetterKeysEnabled = !open;
      })
    );

    this.subscriptions.push(
      this.iiifManifestService.currentManifest.subscribe((manifest: Manifest) => {
        this.isSearchable = this.isManifestSearchable(manifest);
      })
    );

    this.subscriptions.push(
      this.iiifContentSearchService.onChange.subscribe((result: SearchResult) => {
        this.hasHits = result.hits.length > 0;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public handleKeyEvents(event: KeyboardEvent) {
    const accessKeys = new AccessKeys(event);
    if (this.isLetterKeysEnabled) {
      if (accessKeys.isNextPageKeys() && !(this.isZoomedIn() && accessKeys.isArrowRightKeys())) {
        this.goToNextPage();
      } else if (accessKeys.isPreviousPageKeys() && !(this.isZoomedIn() && accessKeys.isArrowLeftKeys())) {
        this.goToPreviousPage();
      } else if (accessKeys.isFirstPageKeys()) {
        this.goToFirstPage();
      } else if (accessKeys.isLastPageKeys()) {
        this.goToLastPage();
      } else if (accessKeys.isNextHitKeys() && this.hasHits) {
        this.goToNextHit();
      } else if (accessKeys.isPreviousHitKeys() && this.hasHits) {
        this.goToPreviousHit();
      } else if (accessKeys.isZoomInKeys()) {
        this.zoomIn();
      } else if (accessKeys.isZoomOutKeys()) {
        this.zoomOut();
      } else if (accessKeys.isZoomHomeKeys()) {
        this.zoomHome();
      } else if (accessKeys.isFullscreenKeys()) {
        this.toggleFullscreen();
      } else if (accessKeys.isSearchDialogKeys()) {
        this.toggleSearchDialog();
      } else if (accessKeys.isContentsDialogKeys()) {
        this.toggleContentsDialog();
      } else if (accessKeys.isResetSearchKeys()) {
        this.resetSearch();
      }
    }
  }

  public disableLetterKeys() {
    this.isLetterKeysEnabled = false;
  }

  public enableLetterKeys() {
    this.isLetterKeysEnabled = true;
  }

  private goToNextPage() {
    this.viewerService.goToNextPage();
  }

  private goToPreviousPage() {
    this.viewerService.goToPreviousPage();
  }

  private goToFirstPage() {
    this.viewerService.goToPage(0, false);
  }

  private goToLastPage() {
    this.viewerService.goToPage(this.pageService.numberOfPages - 1, false);
  }

  private goToNextHit() {
    this.contentSearchNavigationService.goToNextHitPage();
  }

  private goToPreviousHit() {
    this.contentSearchNavigationService.goToPreviousHitPage();
  }

  private zoomIn() {
    if (this.modeService.mode === ViewerMode.DASHBOARD) {
      this.modeService.toggleMode();
    } else {
      this.viewerService.zoomIn();
    }
  }

  private zoomOut() {
    if (this.modeService.mode === ViewerMode.PAGE) {
      this.modeService.toggleMode();
    } else if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      this.viewerService.zoomOut();
    }
  }

  private zoomHome() {
    if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      this.viewerService.home();
    }
  }

  private toggleSearchDialog() {
    this.contentsDialogService.close();
    this.contentSearchDialogService.toggle();
    this.isSearchDialogOpen = !this.isSearchDialogOpen;
  }

  private toggleContentsDialog() {
    this.contentSearchDialogService.close();
    this.contentsDialogService.toggle();
  }

  private toggleFullscreen() {
    this.mimeDomHelper.toggleFullscreen();
  }

  private resetSearch() {
    this.iiifContentSearchService.destroy();
  }

  private isManifestSearchable(manifest: Manifest): boolean {
    return manifest.service ? true : false;
  }

  private isZoomedIn(): boolean {
    return this.viewerService.getZoom() !== this.viewerService.getHomeZoomLevel(this.modeService.mode);
  }
}