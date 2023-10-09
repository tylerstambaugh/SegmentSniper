export interface SummarySegment {
  id: string;
  name: string;
  activityType: string;
  distance: number;
  averageGrade: number;
  maximumGrade: number;
  elevationHigh: number;
  elevationLow: number;
  startLatlng: [number, number];
  endLatlng: [number, number];
  elevationProfile: string | null;
  climbCategory: number;
  city: string;
  state: string;
  country: string;
  isPrivate: boolean;
  isHazardous: boolean;
  isStarred: boolean;
}
