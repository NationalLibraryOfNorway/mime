import { MimeDomHelper } from './../core/mime-dom-helper';
import { ElementRef } from '@angular/core';
import { MdDialogConfig } from '@angular/material';

import { Dimensions } from './../core/models/dimensions';

export interface SearchDialogConfigStrategy {
  getConfig(elementRef?: ElementRef): MdDialogConfig;
}

export class MobileSearchDialogConfigStrategy implements SearchDialogConfigStrategy {

  public getConfig(elementRef: ElementRef): MdDialogConfig {
    return {
      hasBackdrop: false,
      disableClose: true,
      width: '100%',
      height: '100%'
    };
  }
}

export class DesktopSearchDialogConfigStrategy implements SearchDialogConfigStrategy {
  public static readonly dialogWidth = 350;
  public static readonly paddingRight = 20;

  public getConfig(el: ElementRef): MdDialogConfig {
    const dimensions = this.getPosition(el);
    return {
      hasBackdrop: false,
      disableClose: true,
      width: `${DesktopSearchDialogConfigStrategy.dialogWidth}px`,
      position: {
        top: dimensions.top + 'px',
        left: dimensions.left + 'px',
      }
    };
  }

  private getPosition(el: ElementRef): Dimensions {
    const dimensions = new MimeDomHelper().getBoundingClientRect(el);
    return new Dimensions({
      top: dimensions.top + 64,
      left: dimensions.right - DesktopSearchDialogConfigStrategy.dialogWidth - DesktopSearchDialogConfigStrategy.paddingRight
    });
  }

}