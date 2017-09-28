import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from './../../core/viewer-intl';
import { CustomOptions } from '../../core/models/options-custom';
import { IiifContentSearchService } from './../../core/iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from './../../core/models/search-result';

@Component({
  selector: 'mime-viewer-footer',
  templateUrl: './viewer-footer.component.html',
  styleUrls: ['./viewer-footer.component.scss'],
  animations: [
    trigger('footerState', [
      state('hide', style({
        opacity: 0,
        display: 'none',
        transform: 'translate(0, 100%)'
      })),
      state('show', style({
        opacity: 1,
        display: 'block',
        transform: 'translate(0, 0)'
      })),
      transition('hide => show', animate(CustomOptions.transitions.toolbarsEaseInTime + 'ms ease-in')),
      transition('show => hide', animate(CustomOptions.transitions.toolbarsEaseOutTime + 'ms ease-out'))
    ])
  ],
  host: {
    '[@footerState]': 'state'
  }
})
export class ViewerFooterComponent implements OnInit, OnDestroy {

  public state = 'show';
  public showNavigationToolbar = true;
  public searchResult: SearchResult = null;
  public hasContentSearchHits = false;
  private subscriptions: Array<Subscription> = [];

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private iiifContentSearchService: IiifContentSearchService) { }

  ngOnInit() {
    this.subscriptions.push(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));

    this.subscriptions.push(this.iiifContentSearchService.onChange.subscribe((sr: SearchResult) => {
      this.searchResult = sr;
      this.hasContentSearchHits = sr.size() > 0;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
