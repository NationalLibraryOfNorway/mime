import { Injectable, ElementRef } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { AttributionDialogComponent } from './attribution-dialog.component';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import { Rect } from './../core/models/rect';

@Injectable()
export class AttributionDialogService {
  private isAttributionDialogOpen = false;
  private dialogRef: MdDialogRef<AttributionDialogComponent>;
  private _elementRef: ElementRef;
  private attributionDialogHeight = 0;

  constructor(
    private dialog: MdDialog,
    private resizeService: MimeResizeService,
    private attributionDialogResizeService: AttributionDialogResizeService,
  ) {
    resizeService.onResize.subscribe((r: Rect) => {
      if (this.isAttributionDialogOpen) {
        const config = this.getDialogConfig();
        this.dialogRef.updatePosition(config.position);
      }
    });
    attributionDialogResizeService.onResize.subscribe((r: Rect) => {
      if (this.isAttributionDialogOpen) {
        this.attributionDialogHeight = r.height;
        const config = this.getDialogConfig();
        this.dialogRef.updatePosition(config.position);
      }
    });

  }

  set elementRef(elementRef: ElementRef) {
    this._elementRef = elementRef;
  }

  public open(): void {
    if (!this.isAttributionDialogOpen) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(AttributionDialogComponent, config);
      this.dialogRef.afterClosed().subscribe(result => {
        this.isAttributionDialogOpen = false;
      });
      this.isAttributionDialogOpen = true;
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

  public toggle(): void {
    this.isAttributionDialogOpen ? this.close() : this.open();
  }

  private getDialogConfig(): MdDialogConfig {
    const rect = this.getPosition(this._elementRef);
    return {
      hasBackdrop: false,
      disableClose: true,
      width: '170px',
      panelClass: 'attribution-panel',
      position: {
        top: rect.top + 'px',
        left: rect.left + 'px',
      }
    };
  }

  private getPosition(elementRef: ElementRef) {
    const padding = 20;
    if (!elementRef) {
      return {
        top: 0,
        left: 0
      };
    }
    const rect = elementRef.nativeElement.getBoundingClientRect();
    return {
      top: rect.top + (rect.bottom - rect.top) - this.attributionDialogHeight - padding,
      left: rect.left + padding
    };
  }

}