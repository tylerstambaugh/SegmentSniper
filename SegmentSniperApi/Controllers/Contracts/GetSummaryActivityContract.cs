namespace SegmentSniper.Api.Controllers.Contracts
{
    public class GetSummaryActivityContract
    {
        public string? ActivityId { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? StartDate { get; set; }
        public string? ActivityType { get; set; }
    }
}
