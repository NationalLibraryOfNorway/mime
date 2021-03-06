import { ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
export declare class AttributionDialogService {
    private dialog;
    private mimeResizeService;
    private attributionDialogResizeService;
    private mimeDomHelper;
    private isAttributionDialogOpen;
    private dialogRef;
    private _el;
    private attributionDialogHeight;
    private subscriptions;
    constructor(dialog: MatDialog, mimeResizeService: MimeResizeService, attributionDialogResizeService: AttributionDialogResizeService, mimeDomHelper: MimeDomHelper);
    initialize(): void;
    destroy(): void;
    set el(el: ElementRef);
    open(timeout?: number): void;
    close(): void;
    toggle(): void;
    private closeDialogAfter;
    private getDialogConfig;
    private getPosition;
    private unsubscribe;
}
