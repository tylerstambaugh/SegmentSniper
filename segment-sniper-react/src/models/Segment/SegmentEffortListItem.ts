import { AthleteSegmentStats } from "./AthleteSegmentStats";
import { SummarySegment } from "./SummarySegment";
import { Xoms } from "./Xoms";

export interface SegmentEffortListItem {
  segmentId?: string;
  segmentEffortId?: number;
  name?: string;
  time?: number;
  distance?: number;
  athleteStats?: AthleteSegmentStats;
  xoms?: Xoms;
  rank?: number;
  starred?: boolean;
  summarySegment: SummarySegment;
}
