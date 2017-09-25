import { MimeDomHelper } from './../core/mime-dom-helper';
import { ElementRef } from '@angular/core';
import { MdDialogConfig } from '@angular/material';

import { Dimensions } from './../core/models/dimensions';

export interface ContentSearchDialogConfigStrategy {
  getConfig(elementRef?: ElementRef): MdDialogConfig;
}

export class MobileContentSearchDialogConfigStrategy implements ContentSearchDialogConfigStrategy {

  public getConfig(elementRef: ElementRef): MdDialogConfig {
    return {
      hasBackdrop: false,
      disableClose: false,
      width: '100%',
      height: '100%'
    };
  }
}

export class DesktopContentSearchDialogConfigStrategy implements ContentSearchDialogConfigStrategy {
  public static readonly dialogWidth = 350;
  public static readonly paddingRight = 20;
  private mimeDomHelper: MimeDomHelper;

  constructor(mimeDomHelper: MimeDomHelper) {
    this.mimeDomHelper = mimeDomHelper;
  }

  public getConfig(el: ElementRef): MdDialogConfig {
    const dimensions = this.getPosition(el);
    return {
      hasBackdrop: false,
      disableClose: false,
      width: `${DesktopContentSearchDialogConfigStrategy.dialogWidth}px`,
      position: {
        top: dimensions.top + 'px',
        left: dimensions.left + 'px',
      }
    };
  }

  private getPosition(el: ElementRef): Dimensions {
    const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
    return new Dimensions({
      top: dimensions.top + 64,
      left: dimensions.right - DesktopContentSearchDialogConfigStrategy.dialogWidth - DesktopContentSearchDialogConfigStrategy.paddingRight
    });
  }

}
