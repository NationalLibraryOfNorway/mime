import * as d3 from 'd3';

import { Direction } from '../models/direction';
import { ModeService } from '../mode-service/mode.service';
import { CanvasService } from '../canvas-service/canvas-service';
import { ViewerMode } from '../models/viewer-mode';
import { ViewerOptions } from '../models/viewer-options';
import { Point } from '../models/point';
import { Dimensions } from '../models/dimensions';
import { Utils } from '../utils';
import { ZoomUtils } from './zoom-utils';

export interface CanvasGroup {
  canvasGroupIndex: number;
  canvasGroupEndHitCountReached?: boolean;
  direction: Direction;
  immediately: boolean;
}

export interface Strategy {
  setMinZoom(mode: ViewerMode): void;
  getMinZoom(): number;
  getMaxZoom(): number;
  getZoom(): number;
  goToHomeZoom(): void;
  zoomTo(level: number, position?: Point): void;
  zoomIn(zoomFactor?: number, position?: Point): void;
  zoomOut(zoomFactor?: number, position?: Point): void;
}

export class ZoomStrategy {
  constructor(protected viewer: any, protected canvasService: CanvasService, protected modeService: ModeService) {}

  setMinZoom(mode: ViewerMode): void {
    this.viewer.viewport.minZoomLevel = this.getHomeZoomLevel(mode);
  }

  getMinZoom(): number {
    return Utils.shortenDecimals(this.viewer.viewport.getMinZoom(), 5);
  }

  getMaxZoom(): number {
    return Utils.shortenDecimals(this.viewer.viewport.getMaxZoom(), 5);
  }

  getZoom(): number {
    return Utils.shortenDecimals(this.viewer.viewport.getZoom(true), 5);
  }

  goToHomeZoom(): void {
    this.zoomTo(this.getHomeZoomLevel(this.modeService.mode));
    if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      this.modeService.mode = ViewerMode.PAGE;
    }
  }

  zoomTo(level: number, position?: Point): void {
    this.viewer.viewport.zoomTo(level, position);
  }

  private getHomeZoomLevel(mode: ViewerMode): number {
    if (!this.viewer || !this.canvasService) {
      return;
    }

    let canvasGroupHeight: number;
    let canvasGroupWidth: number;
    let viewportBounds: any;

    if (mode === ViewerMode.DASHBOARD) {
      canvasGroupHeight = this.canvasService.getMaxHeight();
      canvasGroupWidth = this.canvasService.getMaxWidth();
      viewportBounds = this.getDashboardViewportBounds();
    } else {
      const currentCanvasGroupRect = this.canvasService.getCurrentCanvasGroupRect();
      canvasGroupHeight = currentCanvasGroupRect.height;
      canvasGroupWidth = currentCanvasGroupRect.width;
      viewportBounds = this.viewer.viewport.getBounds();
    }

    return this.getFittedZoomLevel(viewportBounds, canvasGroupHeight, canvasGroupWidth);
  }

  zoomIn(zoomFactor?: number, position?: Point): void {
    if (typeof zoomFactor === 'undefined') {
      zoomFactor = ViewerOptions.zoom.zoomFactor;
    }

    if (typeof position !== 'undefined') {
      position = this.viewer.viewport.pointFromPixel(position);
      position = ZoomUtils.constrainPositionToCanvasGroup(position, this.canvasService.getCurrentCanvasGroupRect());
    }

    if (this.modeService.mode !== ViewerMode.PAGE_ZOOMED) {
      this.modeService.mode = ViewerMode.PAGE_ZOOMED;
    }

    this.zoomBy(zoomFactor, position);
  }

  zoomOut(zoomFactor?: number, position?: Point): void {
    if (typeof zoomFactor === 'undefined') {
      zoomFactor = Math.pow(ViewerOptions.zoom.zoomFactor, -1);
    }

    if (typeof position !== 'undefined') {
      position = this.viewer.viewport.pointFromPixel(position);
      position = ZoomUtils.constrainPositionToCanvasGroup(position, this.canvasService.getCurrentCanvasGroupRect());
    }

    if (this.isViewportLargerThanCanvasGroup()) {
      this.modeService.mode = ViewerMode.PAGE;
    } else {
      this.zoomBy(zoomFactor, position);
    }
  }

  private getDashboardViewportBounds(): any {
    if (!this.viewer) {
      return;
    }

    const maxViewportDimensions = new Dimensions(
      d3
        .select(this.viewer.container.parentNode.parentNode)
        .node()
        .getBoundingClientRect()
    );
    const viewportHeight = maxViewportDimensions.height - ViewerOptions.padding.header - ViewerOptions.padding.footer;
    const viewportWidth = maxViewportDimensions.width;

    const viewportSizeInViewportCoordinates = this.viewer.viewport.deltaPointsFromPixels(
      new OpenSeadragon.Point(viewportWidth, viewportHeight)
    );

    return new OpenSeadragon.Rect(0, 0, viewportSizeInViewportCoordinates.x, viewportSizeInViewportCoordinates.y);
  }

  private getFittedZoomLevel(viewportBounds: any, canvasGroupHeight: number, canvasGroupWidth: number) {
    const currentZoom: number = this.viewer.viewport.getZoom();
    const resizeRatio: number = viewportBounds.height / canvasGroupHeight;

    if (resizeRatio * canvasGroupWidth <= viewportBounds.width) {
      return Utils.shortenDecimals(resizeRatio * currentZoom, 5);
    } else {
      // Canvas group at full height is wider than viewport.  Return fit by width instead.
      return Utils.shortenDecimals(viewportBounds.width / canvasGroupWidth * currentZoom, 5);
    }
  }

  private zoomBy(zoomFactor: number, position?: Point): void {
    const currentZoom = this.viewer.viewport.getZoom(false);
    zoomFactor = ZoomUtils.constraintZoomFactor(zoomFactor, currentZoom, this.getMaxZoom());
    this.viewer.viewport.zoomBy(zoomFactor, position);
  }

  private isViewportLargerThanCanvasGroup(): boolean {
    const canvasGroupRec = this.canvasService.getCurrentCanvasGroupRect();
    const viewportBounds = this.viewer.viewport.getBounds();
    const pbWidth = Math.round(canvasGroupRec.width);
    const pbHeight = Math.round(canvasGroupRec.height);
    const vpWidth = Math.round(viewportBounds.width);
    const vpHeight = Math.round(viewportBounds.height);
    return vpHeight >= pbHeight || vpWidth >= pbWidth;
  }
}

export class DefaultZoomStrategy extends ZoomStrategy implements Strategy {
  constructor(viewer: any, canvasService: CanvasService, modeService: ModeService) {
    super(viewer, canvasService, modeService);
  }
}
