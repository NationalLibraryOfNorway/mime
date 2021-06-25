import { Rect } from '../models/rect';
export const canvasRectFromCriteria = (rotation, criteria, x) => {
    let rect = {};
    if (rotation === 90 || rotation === 270) {
        rect = {
            height: criteria.canvasSource.width,
            width: criteria.canvasSource.height,
            x: x,
            y: (criteria.canvasSource.width / 2) * -1,
        };
    }
    else {
        rect = {
            height: criteria.canvasSource.height,
            width: criteria.canvasSource.width,
            x: x,
            y: (criteria.canvasSource.height / 2) * -1,
        };
    }
    return new Rect(rect);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRlLWNhbnZhcy1ncm91cC1wb3NpdGlvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2NhbnZhcy1ncm91cC1wb3NpdGlvbi9jYWxjdWxhdGUtY2FudmFzLWdyb3VwLXBvc2l0aW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd0QyxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRyxDQUNwQyxRQUFnQixFQUNoQixRQUFxQyxFQUNyQyxDQUFTLEVBQ1QsRUFBRTtJQUNGLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNkLElBQUksUUFBUSxLQUFLLEVBQUUsSUFBSSxRQUFRLEtBQUssR0FBRyxFQUFFO1FBQ3ZDLElBQUksR0FBRztZQUNMLE1BQU0sRUFBRSxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFDbkMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTTtZQUNuQyxDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMxQyxDQUFDO0tBQ0g7U0FBTTtRQUNMLElBQUksR0FBRztZQUNMLE1BQU0sRUFBRSxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU07WUFDcEMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSztZQUNsQyxDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMzQyxDQUFDO0tBQ0g7SUFDRCxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlY3QgfSBmcm9tICcuLi9tb2RlbHMvcmVjdCc7XG5pbXBvcnQgeyBDYW52YXNHcm91cFBvc2l0aW9uQ3JpdGVyaWEgfSBmcm9tICcuL2NhbGN1bGF0ZS1jYW52YXMtZ3JvdXAtcG9zaXRpb24tc3RyYXRlZ3knO1xuXG5leHBvcnQgY29uc3QgY2FudmFzUmVjdEZyb21Dcml0ZXJpYSA9IChcbiAgcm90YXRpb246IG51bWJlcixcbiAgY3JpdGVyaWE6IENhbnZhc0dyb3VwUG9zaXRpb25Dcml0ZXJpYSxcbiAgeDogbnVtYmVyXG4pID0+IHtcbiAgbGV0IHJlY3QgPSB7fTtcbiAgaWYgKHJvdGF0aW9uID09PSA5MCB8fCByb3RhdGlvbiA9PT0gMjcwKSB7XG4gICAgcmVjdCA9IHtcbiAgICAgIGhlaWdodDogY3JpdGVyaWEuY2FudmFzU291cmNlLndpZHRoLFxuICAgICAgd2lkdGg6IGNyaXRlcmlhLmNhbnZhc1NvdXJjZS5oZWlnaHQsXG4gICAgICB4OiB4LFxuICAgICAgeTogKGNyaXRlcmlhLmNhbnZhc1NvdXJjZS53aWR0aCAvIDIpICogLTEsXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZWN0ID0ge1xuICAgICAgaGVpZ2h0OiBjcml0ZXJpYS5jYW52YXNTb3VyY2UuaGVpZ2h0LFxuICAgICAgd2lkdGg6IGNyaXRlcmlhLmNhbnZhc1NvdXJjZS53aWR0aCxcbiAgICAgIHg6IHgsXG4gICAgICB5OiAoY3JpdGVyaWEuY2FudmFzU291cmNlLmhlaWdodCAvIDIpICogLTEsXG4gICAgfTtcbiAgfVxuICByZXR1cm4gbmV3IFJlY3QocmVjdCk7XG59O1xuIl19