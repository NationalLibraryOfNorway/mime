import { BehaviorSubject, Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ObservableMedia } from '@angular/flex-layout';

import { MimeViewerConfig } from '../mime-viewer-config';
import { ViewerLayout } from '../models/viewer-layout';
import { Manifest } from '../models/manifest';
import { ManifestUtils } from '../iiif-manifest-service/iiif-manifest-utils';

@Injectable()
export class ViewerLayoutService {
  private mimeConfig = new MimeViewerConfig();
  private _layout: ViewerLayout;
  private subject: BehaviorSubject<ViewerLayout> = new BehaviorSubject<ViewerLayout>(this.mimeConfig.initViewerLayout);
  constructor(
    private media: ObservableMedia
  ) {
  }

  init(): void {
    if (this.mimeConfig.initViewerLayout === ViewerLayout.TWO_PAGE && !this.isMobile()) {
      this._layout = ViewerLayout.TWO_PAGE;
      this.change();
    } else {
      this._layout = ViewerLayout.ONE_PAGE;
      this.change();
    }
  }

  get onChange(): Observable<ViewerLayout> {
    return this.subject.asObservable().distinctUntilChanged();
  }

  get layout(): ViewerLayout {
    return this._layout;
  }

  setLayout(viewerLayout: ViewerLayout) {
    this._layout = viewerLayout;
    this.change();
  }

  private change() {
    this.subject.next(this._layout);
  }

  private isMobile(): boolean {
    return this.media.isActive('lt-md');
  }

}
