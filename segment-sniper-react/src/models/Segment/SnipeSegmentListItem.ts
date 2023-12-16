import { StravaMap } from "../StravaMap";
import { AthleteSegmentStats } from "./AthleteSegmentStats";
import { LocalLegend } from "./LocalLegend";
import { SummarySegment } from "./SummarySegment";
import { Xoms } from "./Xoms";

export interface SnipeSegmentListItem {
  segmentId?: string;
  name?: string;
  komTime?: string;
  qomTime?: string;
  percentageFromKom?: number;
  percentageFromQom?: number;
  secondsFromKom?: number;
  secondsFromQom?: number;
  activityType?: string;
  distance?: number;
  createdAt?: Date;
  map?: StravaMap;
  effortCount?: number;
  athleteCount?: number;
  starred?: boolean;
  starCount?: number;
  summarySegment?: SummarySegment;
  athleteStats?: AthleteSegmentStats;
  xoms?: Xoms;
  localLegend?: LocalLegend;
}
