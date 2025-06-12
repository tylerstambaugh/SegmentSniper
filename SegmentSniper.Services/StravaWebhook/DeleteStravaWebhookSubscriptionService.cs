using SegmentSniper.Data;

namespace SegmentSniper.Services.StravaWebhook
{
    public class DeleteStravaWebhookSubscriptionService : IDeleteStravaWebhookSubscriptionService
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public DeleteStravaWebhookSubscriptionService(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<DeleteStravaWebhookSubscriptionContract.Result> ExecuteAsync(DeleteStravaWebhookSubscriptionContract contract)
        {
            ValidateContract(contract);
            // Find the subscription in the database
            var subscription = await _segmentSniperDbContext.StravaWebhookSubscriptions
                .FirstOrDefaultAsync(s => s.StravaWebhookSubscriptionId == contract.StravaWebhookSubscriptionId);
            if (subscription == null)
            {
                return new DeleteStravaWebhookSubscriptionContract.Result(false, "Subscription not found.");
            }
            // Remove the subscription from the database
            _segmentSniperDbContext.StravaWebhookSubscriptions.Remove(subscription);
            await _segmentSniperDbContext.SaveChangesAsync();
            return new DeleteStravaWebhookSubscriptionContract.Result(true, "Subscription deleted successfully.");
        }
    }
}
