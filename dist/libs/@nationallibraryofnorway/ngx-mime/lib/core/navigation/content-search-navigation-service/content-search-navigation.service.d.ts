import { CanvasService } from '../../canvas-service/canvas-service';
import { IiifContentSearchService } from '../../iiif-content-search-service/iiif-content-search.service';
export declare class ContentSearchNavigationService {
    private canvasService;
    private iiifContentSearchService;
    private currentIndex;
    private isHitOnActiveCanvasGroup;
    private _isFirstHitOnCanvasGroup;
    private _isLastHitOnCanvasGroup;
    private canvasesPerCanvasGroup;
    private searchResult;
    private subscriptions;
    constructor(canvasService: CanvasService, iiifContentSearchService: IiifContentSearchService);
    initialize(): void;
    destroy(): void;
    update(canvasGroupIndex: number): void;
    getCurrentIndex(): number;
    getHitOnActiveCanvasGroup(): boolean;
    getFirstHitCanvasGroup(): boolean;
    getLastHitCanvasGroup(): boolean;
    goToNextCanvasGroupHit(): void;
    goToPreviousCanvasGroupHit(): void;
    private goToCanvasIndex;
    private findLastHitOnCanvasGroup;
    private findFirstHitOnCanvasGroup;
    private findHitOnActiveCanvasGroup;
    private findCurrentHitIndex;
    private isFirstHitOnCanvasGroup;
    private getLastCanvasGroupIndex;
}
