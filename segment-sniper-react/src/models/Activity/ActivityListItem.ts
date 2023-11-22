import { SegmentEffortListItem } from "../Segment/SegmentEffortListItem";

export interface ActivityListItem {
  name?: string;
  activityId?: string;
  type?: string;
  startDate?: string;
  distance?: number;
  elapsedTime?: string;
  achievementCount?: number;
  maxSpeed?: number;
  startLatLang?: number[];
  endLatLang?: number[];
  stravaMap?: StravaMap;
  segmentEffortListItems?: SegmentEffortListItem[];
}

export interface StravaMap {
  id: string;
  polyline?: string;
  summaryPolyline?: string;
}
