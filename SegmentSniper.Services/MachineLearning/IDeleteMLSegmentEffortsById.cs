namespace SegmentSniper.Services.MachineLearning
{
    public interface IDeleteMLSegmentEffortsById
    {
        Task<DeleteMLSegmentEffortsByIdContract.Result> ExecuteAsync(DeleteMLSegmentEffortsByIdContract contract);
    }

    public class DeleteMLSegmentEffortsByIdContract
    {
        public DeleteMLSegmentEffortsByIdContract(List<long> segmentEffortsId, string userId)
        {
            SegmentEffortIds = segmentEffortsId;
            UserId = userId;
        }

        public List<long> SegmentEffortIds { get; set; }
        public string UserId { get; set; }
        public class Result
        {
            public bool Success { get; set; }
            public string? Error { get; set; }
        }
    }
}