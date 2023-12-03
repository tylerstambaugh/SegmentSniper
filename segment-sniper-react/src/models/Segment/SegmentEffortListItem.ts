import { Achievement } from "./Achievement";
import { SummarySegment } from "./SummarySegment";

export interface SegmentEffortListItem {
  activityId?: string;
  segmentEffortId?: number;
  segmentId?: string;
  name?: string;
  distance?: number;
  startIndex?: number;
  endIndex?: number;
  elapsedTime?: string;
  movingTime?: string;
  startDate?: Date;
  startDateLocale?: Date;
  averageHeartRate?: number;
  maxHeartrate?: number;
  averageWatts?: number;
  deviceWatts?: boolean;
  achievements?: Achievement[];
  prRank?: number;
  hidden?: boolean;
  summarySegment: SummarySegment;
}
