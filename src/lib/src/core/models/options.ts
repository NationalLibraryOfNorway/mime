import { CustomOptions } from './options-custom';
import { GestureSettingsMouse, GestureSettingsPen, GestureSettingsTouch, GestureSettingsUnknown } from './gestureSettings';
import { ControlAnchor } from './controlAnchor';
import { Service } from './manifest';
import { ViewerMode } from './viewer-mode';


export class Options {
  id = 'openseadragon';
  element: Element;
  tileSources: any[] = [];
  tabIndex = 0;
  overlays: any[];
  xmlPath: string = null;
  prefixUrl = 'https://openseadragon.github.io/openseadragon/images/';
  navImages: null;
  debugMode = false;
  debugGridColor = '#ffcc00';
  blendTime = 0;
  alwaysBlend = false;
  autoHideControls = true;
  immediateRender = false;
  defaultZoomLevel = 0.00014;
  opacity = 1;
  compositeOperation: string = null;
  placeholderFillStyle: string | CanvasGradient | CanvasPattern = null;
  degrees = 0;
  minZoomLevel = this.defaultZoomLevel;
  maxZoomLevel: number = null;
  homeFillsViewer = false;
  panHorizontal = true;
  panVertical = true;
  constrainDuringPan = true;
  wrapHorizontal = false;
  wrapVertical = false;
  minZoomImageRatio = 1;
  maxZoomPixelRatio = 1.1;
  smoothTileEdgesMinZoom = 1.1;
  iOSDevice = true;
  autoResize = true;
  preserveImageSizeOnResize = false;
  minScrollDeltaTime = 50;
  pixelsPerWheelLine = 40;
  visibilityRatio = 1;
  viewportMargins: Object = {};
  imageLoaderLimit = 0;
  clickTimeThreshold = 300;
  clickDistThreshold = 5;
  dblClickTimeThreshold = 300;
  dblClickDistThreshold = 20;
  springStiffness = 6.5;
  animationTime = CustomOptions.transitions.OSDAnimationTime / 1000;
  gestureSettingsMouse = new GestureSettingsMouse();
  gestureSettingsTouch = new GestureSettingsTouch();
  gestureSettingsPen = new GestureSettingsPen();
  gestureSettingsUnknown = new GestureSettingsUnknown();
  zoomPerClick = 2.0;
  zoomPerScroll = 1.2;
  zoomPerSecond = 1.0;
  showNavigator = false;
  navigatorId: string;
  navigatorPosition = 'TOP_RIGHT';
  navigatorSizeRatio = 0.2;
  navigatorMaintainSizeRatio = false;
  navigatorTop: number | string = null;
  navigatorLeft: number | string = null;
  navigatorHeight: number | string = null;
  navigatorWidth: number | string = null;
  navigatorAutoResize = true;
  navigatorAutoFade = true;
  navigatorRotate = true;
  controlsFadeDelay = 2000;
  controlsFadeLength = 1500;
  maxImageCacheCount = 200;
  timeout = 30000;
  useCanvas = true;
  minPixelRatio = 0.5;
  mouseNavEnabled = true;
  showNavigationControl = true;
  navigationControlAnchor = ControlAnchor.TOP_LEFT;
  showZoomControl = true;
  showHomeControl = true;
  showFullPageControl = false;
  showRotationControl = false;
  showSequenceControl = false;
  sequenceControlAnchor = ControlAnchor.TOP_LEFT;
  navPrevNextWrap = false;
  zoomInButton: string = null;
  zoomOutButton: string = null;
  homeButton = 'homeButton';
  fullPageButton: string;
  rotateLeftButton: string;
  rotateRightButton: string;
  previousButton: string;
  nextButton: string;
  sequenceMode = true;
  initialPage = 0;
  preserveViewport = false;
  preserveOverlays = false;
  showReferenceStrip = false;
  referenceStripScroll = 'horizontal';
  referenceStripElement: Element = null;
  referenceStripHeight: number = null;
  referenceStripWidth: number = null;
  referenceStripPosition = 'BOTTOM_LEFT';
  referenceStripSizeRatio = 0.2;
  collectionMode = false;
  collectionRows = 1;
  collectionColumns = 0;
  collectionLayout = 'horizontal';
  collectionTileSize = 800;
  collectionTileMargin = 80;
  crossOriginPolicy: string | boolean = false;
  ajaxWithCredentials = false;

  constructor(tileSources?: Service[]) {
    if (tileSources) {
      this.tileSources = tileSources;
    }
  }
}
