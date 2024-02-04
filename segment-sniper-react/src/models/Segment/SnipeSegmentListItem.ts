import { StravaMap } from "../StravaMap";
import { AthleteSegmentStats } from "./AthleteSegmentStats";
import { LocalLegend } from "./LocalLegend";
import { SegmentEffort } from "./SegmentEffort";
import { Xoms } from "./Xoms";

export interface SnipeSegmentListItem {
  activityId?: string;
  segmentId?: string;
  name?: string;
  komTime?: string;
  qomTime?: string;
  percentageFromKom?: number;
  percentageFromQom?: number;
  prPercentageFromKom?: number;
  prPercentageFromQom?: number;
  secondsFromKom?: string;
  secondsFromQom?: string;
  prSecondsFromKom?: string;
  prSecondsFromQom?: string;
  activityType?: string;
  distance?: number;
  elevation?: number;
  createdAt?: Date;
  map?: StravaMap;
  effortCount?: number;
  athleteCount?: number;
  starred?: boolean;
  starCount?: number;
  athleteSegmentStats?: AthleteSegmentStats;
  xoms?: Xoms;
  localLegend?: LocalLegend;
  detailedSegmentEffort?: SegmentEffort;
  heading?: string;
}
