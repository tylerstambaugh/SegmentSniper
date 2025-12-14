namespace SegmentSniper.Services.MachineLearning
{
    public interface IDeleteMLSegmentEffortsByActivityId
    {
        Task<DeleteMLSegmentEffortsByActivityIdContract.Result> ExecuteAsync(DeleteMLSegmentEffortsByActivityIdContract contract);
    }

    public class DeleteMLSegmentEffortsByActivityIdContract
    {
        public DeleteMLSegmentEffortsByActivityIdContract(string activityId, string userId)
        {
            ActivityId = activityId;
            UserId = userId;
        }

        public string ActivityId { get; set; }
        public string UserId { get; set; }
        public class Result
        {
            public bool Success { get; set; }
            public string? Error { get; set; }
        }
    }
}