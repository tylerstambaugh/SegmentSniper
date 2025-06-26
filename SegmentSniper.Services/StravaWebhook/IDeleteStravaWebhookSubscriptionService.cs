namespace SegmentSniper.Services.StravaWebhook
{
    public interface IDeleteStravaWebhookSubscriptionService
    {
        Task<DeleteStravaWebhookSubscriptionContract.Result> ExecuteAsync(DeleteStravaWebhookSubscriptionContract contract);
    }

    public class DeleteStravaWebhookSubscriptionContract
    {
        public DeleteStravaWebhookSubscriptionContract(long stravaWebhookSubscriptionId)
        {
            StravaWebhookSubscriptionId = stravaWebhookSubscriptionId;
        }

        public long StravaWebhookSubscriptionId { get; set; }
        public class Result
        {
            public bool Success { get; set; }
            public string? ErrorMessage { get; set; }

            public Result(bool success, string errorMessage)
            {
                Success = success;
                ErrorMessage = errorMessage;
            }
        }
    }
}