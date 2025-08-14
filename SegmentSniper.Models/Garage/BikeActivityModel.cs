namespace SegmentSniper.Models.Garage
{
    public class BikeActivityModel
    {
        public required string UserId { get; set; }
        public required string StravaActivityId { get; set; }
        public double DistanceInMeters { get; set; }
        public required string BikeId { get; set; }
        public required DateTime ActivityDate { get; set; }
    }
}
