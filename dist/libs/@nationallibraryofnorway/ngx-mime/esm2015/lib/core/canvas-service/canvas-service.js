import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { CanvasGroups } from './../models/canvas-groups';
import { CanvasGroupStrategyFactory } from './canvas-groups-strategy.factory';
export class CanvasService {
    constructor() {
        this._currentNumberOfCanvasGroups = new BehaviorSubject(0);
        this._currentCanvasGroupIndex = new BehaviorSubject(0);
        this.canvasGroups = new CanvasGroups();
        this._numberOfCanvases = 0;
    }
    addAll(canvasRects, layout) {
        this.numberOfCanvases = canvasRects.length;
        const canvasGroupStrategy = CanvasGroupStrategyFactory.create(layout);
        this.canvasGroups = canvasGroupStrategy.addAll(canvasRects);
        this._currentNumberOfCanvasGroups.next(this.canvasGroups.length());
    }
    reset() {
        this.numberOfCanvases = 0;
        this._currentCanvasGroupIndex.next(0);
        this.canvasGroups = new CanvasGroups();
    }
    get onCanvasGroupIndexChange() {
        return this._currentCanvasGroupIndex
            .asObservable()
            .pipe(distinctUntilChanged());
    }
    get onNumberOfCanvasGroupsChange() {
        return this._currentNumberOfCanvasGroups
            .asObservable()
            .pipe(distinctUntilChanged());
    }
    set currentCanvasGroupIndex(currentCanvasGroupIndex) {
        if (!this.isWithinBounds(currentCanvasGroupIndex)) {
            return;
        }
        this._currentCanvasGroupIndex.next(currentCanvasGroupIndex);
    }
    get currentCanvasGroupIndex() {
        return this._currentCanvasGroupIndex.value;
    }
    get numberOfCanvases() {
        return this._numberOfCanvases;
    }
    set numberOfCanvases(numberOfCanvases) {
        this._numberOfCanvases = numberOfCanvases;
    }
    get numberOfCanvasGroups() {
        return this.canvasGroups.length();
    }
    get currentCanvasIndex() {
        return this.canvasGroups.canvasesPerCanvasGroup[this.currentCanvasGroupIndex][0];
    }
    isWithinBounds(canvasGroupIndex) {
        return (canvasGroupIndex > -1 && canvasGroupIndex <= this.numberOfCanvasGroups - 1);
    }
    isCurrentCanvasGroupValid() {
        return this.isWithinBounds(this.currentCanvasGroupIndex);
    }
    // Returns -1 if next canvas index is out of bounds
    getNextCanvasGroupIndex() {
        if (!this.isWithinBounds(this.currentCanvasGroupIndex + 1)) {
            return -1;
        }
        this.currentCanvasGroupIndex++;
        return this.currentCanvasGroupIndex;
    }
    // Returns -1 if previous canvas index is out of bounds
    getPrevCanvasGroupIndex() {
        if (!this.isWithinBounds(this.currentCanvasGroupIndex - 1)) {
            return -1;
        }
        this.currentCanvasGroupIndex--;
        return this.currentCanvasGroupIndex;
    }
    constrainToRange(canvasGroupsIndex) {
        if (canvasGroupsIndex < 0) {
            return 0;
        }
        else if (canvasGroupsIndex >= this.numberOfCanvasGroups - 1) {
            return this.numberOfCanvasGroups - 1;
        }
        else {
            return canvasGroupsIndex;
        }
    }
    findClosestCanvasGroupIndex(point) {
        return this.canvasGroups.findClosestIndex(point);
    }
    findCanvasGroupByCanvasIndex(canvasIndex) {
        return this.canvasGroups.canvasesPerCanvasGroup.findIndex(function (canvasForCanvasGroup) {
            return canvasForCanvasGroup.indexOf(canvasIndex) >= 0;
        });
    }
    findCanvasByCanvasIndex(canvasIndex) {
        return this.canvasGroups.canvasesPerCanvasGroup.length === 0
            ? -1
            : this.canvasGroups.canvasesPerCanvasGroup[canvasIndex][0];
    }
    getCanvasGroupLabel(canvasGroupIndex) {
        if (!this.canvasGroups.canvasGroupRects ||
            this.canvasGroups.canvasesPerCanvasGroup.length === 0) {
            return '1';
        }
        const canvasGroup = this.canvasGroups.canvasesPerCanvasGroup[canvasGroupIndex];
        let canvasGroupLabel = '' + (canvasGroup[0] + 1);
        if (canvasGroup.length > 1) {
            canvasGroupLabel =
                canvasGroupLabel + '-' + (canvasGroup[canvasGroup.length - 1] + 1);
        }
        return canvasGroupLabel;
    }
    getCanvasesPerCanvasGroup(canvasIndex) {
        return !this.canvasGroups.canvasGroupRects
            ? [0]
            : this.canvasGroups.canvasesPerCanvasGroup[canvasIndex];
    }
    getCanvasRect(canvasIndex) {
        return this.canvasGroups.canvasRects[canvasIndex];
    }
    getCurrentCanvasGroupRect() {
        return this.getCanvasGroupRect(this.currentCanvasGroupIndex);
    }
    getCanvasGroupRect(canvasGroupIndex) {
        return this.canvasGroups.get(canvasGroupIndex);
    }
    getMaxHeight() {
        return this.canvasGroups.getMaxHeight();
    }
    getMaxWidth() {
        return this.canvasGroups.getMaxWidth();
    }
}
CanvasService.decorators = [
    { type: Injectable }
];
CanvasService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBSXpELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRzlFLE1BQU0sT0FBTyxhQUFhO0lBV3hCO1FBVlUsaUNBQTRCLEdBRWxDLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLDZCQUF3QixHQUU5QixJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqQixpQkFBWSxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hELHNCQUFpQixHQUFHLENBQUMsQ0FBQztJQUVqQixDQUFDO0lBRWhCLE1BQU0sQ0FBQyxXQUFtQixFQUFFLE1BQW9CO1FBQzlDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQzNDLE1BQU0sbUJBQW1CLEdBQUcsMEJBQTBCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxZQUFZLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxLQUFLO1FBQ0gs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LENBQUM7SUFDMUIsQ0FBQztJQUVELHlCQUF5QixDQUFDLFdBQW1CO1FBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQjtZQUN4QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsYUFBYSxDQUFDLFdBQW1CO1FBQy9CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELHlCQUF5QjtRQUN2QixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsZ0JBQXdCO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDOzs7WUF6S0YsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IENhbnZhc0dyb3VwcyB9IGZyb20gJy4vLi4vbW9kZWxzL2NhbnZhcy1ncm91cHMnO1xuaW1wb3J0IHsgVmlld2VyTGF5b3V0IH0gZnJvbSAnLi4vbW9kZWxzL3ZpZXdlci1sYXlvdXQnO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLy4uL21vZGVscy9wb2ludCc7XG5pbXBvcnQgeyBSZWN0IH0gZnJvbSAnLi8uLi9tb2RlbHMvcmVjdCc7XG5pbXBvcnQgeyBDYW52YXNHcm91cFN0cmF0ZWd5RmFjdG9yeSB9IGZyb20gJy4vY2FudmFzLWdyb3Vwcy1zdHJhdGVneS5mYWN0b3J5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhbnZhc1NlcnZpY2Uge1xuICBwcm90ZWN0ZWQgX2N1cnJlbnROdW1iZXJPZkNhbnZhc0dyb3VwczogQmVoYXZpb3JTdWJqZWN0PFxuICAgIG51bWJlclxuICA+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcbiAgcHJvdGVjdGVkIF9jdXJyZW50Q2FudmFzR3JvdXBJbmRleDogQmVoYXZpb3JTdWJqZWN0PFxuICAgIG51bWJlclxuICA+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcblxuICBwcm90ZWN0ZWQgY2FudmFzR3JvdXBzOiBDYW52YXNHcm91cHMgPSBuZXcgQ2FudmFzR3JvdXBzKCk7XG4gIHByb3RlY3RlZCBfbnVtYmVyT2ZDYW52YXNlcyA9IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGFkZEFsbChjYW52YXNSZWN0czogUmVjdFtdLCBsYXlvdXQ6IFZpZXdlckxheW91dCkge1xuICAgIHRoaXMubnVtYmVyT2ZDYW52YXNlcyA9IGNhbnZhc1JlY3RzLmxlbmd0aDtcbiAgICBjb25zdCBjYW52YXNHcm91cFN0cmF0ZWd5ID0gQ2FudmFzR3JvdXBTdHJhdGVneUZhY3RvcnkuY3JlYXRlKGxheW91dCk7XG4gICAgdGhpcy5jYW52YXNHcm91cHMgPSBjYW52YXNHcm91cFN0cmF0ZWd5LmFkZEFsbChjYW52YXNSZWN0cyk7XG4gICAgdGhpcy5fY3VycmVudE51bWJlck9mQ2FudmFzR3JvdXBzLm5leHQodGhpcy5jYW52YXNHcm91cHMubGVuZ3RoKCkpO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5udW1iZXJPZkNhbnZhc2VzID0gMDtcbiAgICB0aGlzLl9jdXJyZW50Q2FudmFzR3JvdXBJbmRleC5uZXh0KDApO1xuICAgIHRoaXMuY2FudmFzR3JvdXBzID0gbmV3IENhbnZhc0dyb3VwcygpO1xuICB9XG5cbiAgZ2V0IG9uQ2FudmFzR3JvdXBJbmRleENoYW5nZSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50Q2FudmFzR3JvdXBJbmRleFxuICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGdldCBvbk51bWJlck9mQ2FudmFzR3JvdXBzQ2hhbmdlKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnROdW1iZXJPZkNhbnZhc0dyb3Vwc1xuICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIHNldCBjdXJyZW50Q2FudmFzR3JvdXBJbmRleChjdXJyZW50Q2FudmFzR3JvdXBJbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLmlzV2l0aGluQm91bmRzKGN1cnJlbnRDYW52YXNHcm91cEluZGV4KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50Q2FudmFzR3JvdXBJbmRleC5uZXh0KGN1cnJlbnRDYW52YXNHcm91cEluZGV4KTtcbiAgfVxuXG4gIGdldCBjdXJyZW50Q2FudmFzR3JvdXBJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50Q2FudmFzR3JvdXBJbmRleC52YWx1ZTtcbiAgfVxuXG4gIGdldCBudW1iZXJPZkNhbnZhc2VzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX251bWJlck9mQ2FudmFzZXM7XG4gIH1cblxuICBzZXQgbnVtYmVyT2ZDYW52YXNlcyhudW1iZXJPZkNhbnZhc2VzOiBudW1iZXIpIHtcbiAgICB0aGlzLl9udW1iZXJPZkNhbnZhc2VzID0gbnVtYmVyT2ZDYW52YXNlcztcbiAgfVxuXG4gIGdldCBudW1iZXJPZkNhbnZhc0dyb3VwcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc0dyb3Vwcy5sZW5ndGgoKTtcbiAgfVxuXG4gIGdldCBjdXJyZW50Q2FudmFzSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNHcm91cHMuY2FudmFzZXNQZXJDYW52YXNHcm91cFtcbiAgICAgIHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXhcbiAgICBdWzBdO1xuICB9XG5cbiAgaXNXaXRoaW5Cb3VuZHMoY2FudmFzR3JvdXBJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIGNhbnZhc0dyb3VwSW5kZXggPiAtMSAmJiBjYW52YXNHcm91cEluZGV4IDw9IHRoaXMubnVtYmVyT2ZDYW52YXNHcm91cHMgLSAxXG4gICAgKTtcbiAgfVxuXG4gIGlzQ3VycmVudENhbnZhc0dyb3VwVmFsaWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNXaXRoaW5Cb3VuZHModGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCk7XG4gIH1cblxuICAvLyBSZXR1cm5zIC0xIGlmIG5leHQgY2FudmFzIGluZGV4IGlzIG91dCBvZiBib3VuZHNcbiAgZ2V0TmV4dENhbnZhc0dyb3VwSW5kZXgoKTogbnVtYmVyIHtcbiAgICBpZiAoIXRoaXMuaXNXaXRoaW5Cb3VuZHModGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCArIDEpKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXgrKztcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleDtcbiAgfVxuXG4gIC8vIFJldHVybnMgLTEgaWYgcHJldmlvdXMgY2FudmFzIGluZGV4IGlzIG91dCBvZiBib3VuZHNcbiAgZ2V0UHJldkNhbnZhc0dyb3VwSW5kZXgoKTogbnVtYmVyIHtcbiAgICBpZiAoIXRoaXMuaXNXaXRoaW5Cb3VuZHModGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleCAtIDEpKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXgtLTtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Q2FudmFzR3JvdXBJbmRleDtcbiAgfVxuXG4gIGNvbnN0cmFpblRvUmFuZ2UoY2FudmFzR3JvdXBzSW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKGNhbnZhc0dyb3Vwc0luZGV4IDwgMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIGlmIChjYW52YXNHcm91cHNJbmRleCA+PSB0aGlzLm51bWJlck9mQ2FudmFzR3JvdXBzIC0gMSkge1xuICAgICAgcmV0dXJuIHRoaXMubnVtYmVyT2ZDYW52YXNHcm91cHMgLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY2FudmFzR3JvdXBzSW5kZXg7XG4gICAgfVxuICB9XG5cbiAgZmluZENsb3Nlc3RDYW52YXNHcm91cEluZGV4KHBvaW50OiBQb2ludCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzR3JvdXBzLmZpbmRDbG9zZXN0SW5kZXgocG9pbnQpO1xuICB9XG5cbiAgZmluZENhbnZhc0dyb3VwQnlDYW52YXNJbmRleChjYW52YXNJbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNHcm91cHMuY2FudmFzZXNQZXJDYW52YXNHcm91cC5maW5kSW5kZXgoZnVuY3Rpb24oXG4gICAgICBjYW52YXNGb3JDYW52YXNHcm91cDogbnVtYmVyW11cbiAgICApIHtcbiAgICAgIHJldHVybiBjYW52YXNGb3JDYW52YXNHcm91cC5pbmRleE9mKGNhbnZhc0luZGV4KSA+PSAwO1xuICAgIH0pO1xuICB9XG5cbiAgZmluZENhbnZhc0J5Q2FudmFzSW5kZXgoY2FudmFzSW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzR3JvdXBzLmNhbnZhc2VzUGVyQ2FudmFzR3JvdXAubGVuZ3RoID09PSAwXG4gICAgICA/IC0xXG4gICAgICA6IHRoaXMuY2FudmFzR3JvdXBzLmNhbnZhc2VzUGVyQ2FudmFzR3JvdXBbY2FudmFzSW5kZXhdWzBdO1xuICB9XG5cbiAgZ2V0Q2FudmFzR3JvdXBMYWJlbChjYW52YXNHcm91cEluZGV4OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGlmIChcbiAgICAgICF0aGlzLmNhbnZhc0dyb3Vwcy5jYW52YXNHcm91cFJlY3RzIHx8XG4gICAgICB0aGlzLmNhbnZhc0dyb3Vwcy5jYW52YXNlc1BlckNhbnZhc0dyb3VwLmxlbmd0aCA9PT0gMFxuICAgICkge1xuICAgICAgcmV0dXJuICcxJztcbiAgICB9XG5cbiAgICBjb25zdCBjYW52YXNHcm91cCA9IHRoaXMuY2FudmFzR3JvdXBzLmNhbnZhc2VzUGVyQ2FudmFzR3JvdXBbXG4gICAgICBjYW52YXNHcm91cEluZGV4XG4gICAgXTtcbiAgICBsZXQgY2FudmFzR3JvdXBMYWJlbCA9ICcnICsgKGNhbnZhc0dyb3VwWzBdICsgMSk7XG5cbiAgICBpZiAoY2FudmFzR3JvdXAubGVuZ3RoID4gMSkge1xuICAgICAgY2FudmFzR3JvdXBMYWJlbCA9XG4gICAgICAgIGNhbnZhc0dyb3VwTGFiZWwgKyAnLScgKyAoY2FudmFzR3JvdXBbY2FudmFzR3JvdXAubGVuZ3RoIC0gMV0gKyAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2FudmFzR3JvdXBMYWJlbDtcbiAgfVxuXG4gIGdldENhbnZhc2VzUGVyQ2FudmFzR3JvdXAoY2FudmFzSW5kZXg6IG51bWJlcik6IG51bWJlcltdIHtcbiAgICByZXR1cm4gIXRoaXMuY2FudmFzR3JvdXBzLmNhbnZhc0dyb3VwUmVjdHNcbiAgICAgID8gWzBdXG4gICAgICA6IHRoaXMuY2FudmFzR3JvdXBzLmNhbnZhc2VzUGVyQ2FudmFzR3JvdXBbY2FudmFzSW5kZXhdO1xuICB9XG5cbiAgZ2V0Q2FudmFzUmVjdChjYW52YXNJbmRleDogbnVtYmVyKTogUmVjdCB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzR3JvdXBzLmNhbnZhc1JlY3RzW2NhbnZhc0luZGV4XTtcbiAgfVxuXG4gIGdldEN1cnJlbnRDYW52YXNHcm91cFJlY3QoKTogUmVjdCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FudmFzR3JvdXBSZWN0KHRoaXMuY3VycmVudENhbnZhc0dyb3VwSW5kZXgpO1xuICB9XG5cbiAgZ2V0Q2FudmFzR3JvdXBSZWN0KGNhbnZhc0dyb3VwSW5kZXg6IG51bWJlcik6IFJlY3Qge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc0dyb3Vwcy5nZXQoY2FudmFzR3JvdXBJbmRleCk7XG4gIH1cblxuICBnZXRNYXhIZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXNHcm91cHMuZ2V0TWF4SGVpZ2h0KCk7XG4gIH1cblxuICBnZXRNYXhXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc0dyb3Vwcy5nZXRNYXhXaWR0aCgpO1xuICB9XG59XG4iXX0=