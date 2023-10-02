export interface LocalLegend {
  athlete_id: number;
  title: string;
  profile: string;
  effort_description: string;
  effort_count: string;
  effort_counts: {
    overall: string;
    female: string;
  };
  destination: string;
}
