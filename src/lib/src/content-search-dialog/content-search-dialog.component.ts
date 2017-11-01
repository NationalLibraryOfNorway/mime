import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from './../core/intl/viewer-intl';
import { Manifest } from './../core/models/manifest';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { MimeDomHelper } from './../core/mime-dom-helper';
import { Dimensions } from './../core/models/dimensions';
import { SearchResult } from './../core/models/search-result';
import { IiifContentSearchService } from './../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from './../core/iiif-manifest-service/iiif-manifest-service';
import { ViewerService } from './../core/viewer-service/viewer.service';
import { Hit } from './../core/models/search-result';

@Component({
  selector: 'mime-search',
  templateUrl: './content-search-dialog.component.html',
  styleUrls: ['./content-search-dialog.component.scss']
})
export class ContentSearchDialogComponent implements OnInit, OnDestroy {
  public q: string;
  public hits: Hit[] = [];
  public currentSearch = '';
  public numberOfHits = 0;
  public isSearching = false;
  public tabHeight = {};
  public hasFocus = false;
  private manifest: Manifest;
  private mimeHeight = 0;
  private subscriptions: Array<Subscription> = [];
  @ViewChild('contentSearchResult') resultContainer: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<ContentSearchDialogComponent>,
    public intl: MimeViewerIntl,
    public media: ObservableMedia,
    private mimeResizeService: MimeResizeService,
    private iiifManifestService: IiifManifestService,
    private iiifContentSearchService: IiifContentSearchService,
    private viewerService: ViewerService,
    private el: ElementRef,
    private mimeDomHelper: MimeDomHelper) {
    this.subscriptions.push(mimeResizeService.onResize.subscribe((dimensions: Dimensions) => {
      this.mimeHeight = dimensions.height;
      this.resizeTabHeight();
    }));

    this.subscriptions.push(this.iiifManifestService.currentManifest
      .subscribe((manifest: Manifest) => {
        this.manifest = manifest;
      }));

    this.subscriptions.push(iiifContentSearchService.onChange.subscribe((sr: SearchResult) => {
      this.hits = sr.hits;
      this.currentSearch = sr.q ? sr.q : '';
      this.q = sr.q;
      this.numberOfHits = sr.size();
      if (this.resultContainer && this.numberOfHits > 0) {
        this.resultContainer.nativeElement.focus();
      }
    }));

    this.subscriptions.push(iiifContentSearchService.isSearching.subscribe((s: boolean) => {
      this.isSearching = s;
    }));

  }

  ngOnInit() {
    this.resizeTabHeight();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resizeTabHeight();
  }

  onSubmit() {
    this.currentSearch = this.q;
    this.iiifContentSearchService.search(this.manifest, this.q);
  }

  goToHit(hit: Hit): void {
    this.iiifContentSearchService.selected(hit);
    if (this.media.isActive('lt-md')) {
      this.dialogRef.close();
    }
  }

  onFocus() {
    this.hasFocus = true;
  }

  onBlur() {
    this.hasFocus = false;
  }

  private resizeTabHeight(): void {
    const dimensions = this.mimeDomHelper.getBoundingClientRect(this.el);
    let height = this.mimeHeight;

    if (this.media.isActive('lt-md')) {
      this.tabHeight = {
        'maxHeight': window.innerHeight - 128 + 'px'
      };
    } else {
      height -= 272;
      this.tabHeight = {
        'maxHeight': height + 'px'
      };
    }
  }
}
