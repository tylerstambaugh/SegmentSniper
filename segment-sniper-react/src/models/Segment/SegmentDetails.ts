import { Map } from "../Map";
import { StravaMap } from "../StravaMap";
import { AthleteSegmentStatsUiModel } from "./AthleteSegmentStats";
import { Xoms } from "./Xoms";

export interface SegmentDetails {
  segmentId: string;
  name: string;
  activityType: string;
  distance: number;
  averageGrade: number;
  maximumGrade: number;
  elevationHigh: number;
  elevationLow: number;
  startLatlng: [number, number];
  endLatlng: [number, number];
  elevationProfile: string;
  climbCategory: number;
  city: string;
  state: string;
  country: string;
  isPrivate: boolean;
  isHazardous: boolean;
  starred: boolean;
  createdAt: string;
  updatedAt: string;
  totalElevationGain: number;
  map: StravaMap;
  effortCount: number;
  athleteCount: number;
  starCount: number;
  athleteSegmentStats: AthleteSegmentStatsUiModel;
  xoms: Xoms;
}
