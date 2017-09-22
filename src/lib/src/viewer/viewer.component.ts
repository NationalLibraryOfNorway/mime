import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MdDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { ContentsDialogService } from '../contents-dialog/contents-dialog.service';
import { AttributionDialogService } from '../attribution-dialog/attribution-dialog.service';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { Manifest } from '../core/models/manifest';
import { Options } from '../core/models/options';
import { PageService } from '../core/page-service/page-service';
import { ModeService } from '../core/mode-service/mode.service';
import { ViewerMode } from '../core/models/viewer-mode';
import { ViewerHeaderComponent } from './viewer-header/viewer-header.component';
import { ViewerFooterComponent } from './viewer-footer/viewer-footer.component';
import { OsdToolbarComponent } from './osd-toolbar/osd-toolbar.component';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { MimeViewerConfig } from '../core/mime-viewer-config';
import { Dimensions } from '../core/models/dimensions';

@Component({
  selector: 'mime-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public manifestUri: string;
  @Input() public config: MimeViewerConfig = new MimeViewerConfig();
  private subscriptions: Array<Subscription> = [];
  private isCanvasPressed = false;

  ViewerMode: typeof ViewerMode = ViewerMode;

  // Viewchilds
  @ViewChild('mimeHeader') header: ViewerHeaderComponent;
  @ViewChild('mimeFooter') footer: ViewerFooterComponent;
  @ViewChild('mimeOsdToolbar') osdToolbar: OsdToolbarComponent;

  constructor(
    private el: ElementRef,
    private iiifManifestService: IiifManifestService,
    private contentsDialogService: ContentsDialogService,
    private attributionDialogService: AttributionDialogService,
    private viewerService: ViewerService,
    private mimeService: MimeResizeService,
    private dialog: MdDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private pageService: PageService,
    private modeService: ModeService) {
    contentsDialogService.el = el;
    attributionDialogService.el = el;
    mimeService.el = el;
  }

  ngOnInit(): void {
    this.modeService.initialMode = this.config.initViewerMode;
    this.subscriptions.push(
      this.iiifManifestService.currentManifest
        .subscribe((manifest: Manifest) => {
          this.cleanUp();
          this.viewerService.setUpViewer(manifest);
          if (this.config.attributionDialogEnabled && manifest.attribution) {
            this.attributionDialogService.open(this.config.attributionDialogHideTimeout);
          }
        })
    );

    this.subscriptions.push(
      this.viewerService.isCanvasPressed.subscribe((value: boolean) => {
        this.isCanvasPressed = value;
        this.changeDetectorRef.detectChanges();
      })
    );

    this.subscriptions.push(
      this.modeService.onChange.subscribe((mode: ViewerMode) => {
        this.toggleToolbarsState(mode);
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['manifestUri']) {
      const manifestUriChanges: SimpleChange = changes['manifestUri'];
      if (manifestUriChanges.currentValue !== manifestUriChanges.previousValue) {
        this.modeService.mode = this.config.initViewerMode;
        this.manifestUri = manifestUriChanges.currentValue;
        this.cleanUp();
        this.loadManifest();
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  get mode(): ViewerMode {
    return this.modeService.mode;
  }

  toggleToolbarsState(mode: ViewerMode): void {
    switch (mode) {
      case ViewerMode.DASHBOARD:
        this.header.state = this.footer.state = 'show';
        this.viewerService.updatePadding(new Dimensions({top: 80, bottom: 80}));
        if (this.config.navigationControlEnabled && this.osdToolbar) {
          this.osdToolbar.state = 'hide';
        }
        break;
      case ViewerMode.PAGE:
        this.header.state = this.footer.state = 'hide';
        this.viewerService.updatePadding(new Dimensions());
        if (this.config.navigationControlEnabled && this.osdToolbar) {
          this.osdToolbar.state = 'show';
        }
        break;
    }
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewChecked() {
    this.mimeService.markForCheck();
  }

  private loadManifest() {
    this.iiifManifestService.load(this.manifestUri);
  }

  private cleanUp() {
    this.viewerService.destroy();
    this.attributionDialogService.destroy();
    this.contentsDialogService.destroy();
  }

  setClasses() {
    return {
      'page': this.mode === ViewerMode.PAGE,
      'dashboard': this.mode === ViewerMode.DASHBOARD,
      'canvas-pressed': this.isCanvasPressed
    };
  }
}
