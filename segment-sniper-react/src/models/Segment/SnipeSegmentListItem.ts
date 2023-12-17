import { StravaMap } from "../StravaMap";
import { AthleteSegmentStats } from "./AthleteSegmentStats";
import { LocalLegend } from "./LocalLegend";
import { SegmentEffort } from "./SegmentEffort";
import { SummarySegment } from "./SummarySegment";
import { Xoms } from "./Xoms";

export interface SnipeSegmentListItem {
  activityId?: string;
  detailedSegmentEffort?: SegmentEffort;
  segmentId?: string;
  name?: string;
  komTime?: string;
  qomTime?: string;
  percentageFromKom?: number;
  percentageFromQom?: number;
  secondsFromKom?: string;
  secondsFromQom?: string;
  activityType?: string;
  distance?: number;
  createdAt?: Date;
  map?: StravaMap;
  effortCount?: number;
  athleteCount?: number;
  starred?: boolean;
  starCount?: number;
  athleteStats?: AthleteSegmentStats;
  xoms?: Xoms;
  localLegend?: LocalLegend;
}
