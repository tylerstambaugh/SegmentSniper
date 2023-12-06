import { SegmentEffortListItem } from "../Segment/SegmentEffortListItem";
import { StravaMap } from "../StravaMap";

export interface ActivityListItem {
  name?: string;
  activityId?: string;
  type?: string;
  startDate?: string;
  distance?: number;
  elapsedTime?: string;
  achievementCount?: number;
  maxSpeed?: number;
  startLatlng?: number[];
  endLatlng?: number[];
  stravaMap?: StravaMap;
  segmentEffortListItems?: SegmentEffortListItem[];
}
