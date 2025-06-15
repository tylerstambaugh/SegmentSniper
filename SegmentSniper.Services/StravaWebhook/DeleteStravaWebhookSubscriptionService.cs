using Microsoft.EntityFrameworkCore;
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
            var subscription = await _segmentSniperDbContext.StravaWebhookSubscription
                .FirstOrDefaultAsync(s => s.StravaWebhookSubscriptionId == contract.StravaWebhookSubscriptionId);
            if (subscription == null)
            {
                return new DeleteStravaWebhookSubscriptionContract.Result(false, "Subscription not found.");
            }
            // Remove the subscription from the database
            _segmentSniperDbContext.StravaWebhookSubscription.Remove(subscription);
            await _segmentSniperDbContext.SaveChangesAsync();
            return new DeleteStravaWebhookSubscriptionContract.Result(true, "Subscription deleted successfully.");
        }

        private void ValidateContract(DeleteStravaWebhookSubscriptionContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract), "Contract cannot be null.");
            }
            if (contract.StravaWebhookSubscriptionId > 0 )
            {
                throw new ArgumentException("StravaWebhookSubscriptionId cannot be null or empty.", nameof(contract.StravaWebhookSubscriptionId));
            }
            if (_segmentSniperDbContext.StravaWebhookSubscription.Count(s => s.StravaWebhookSubscriptionId == contract.StravaWebhookSubscriptionId) == 0)
            {
                throw new ApplicationException($"No subscription found with ID {contract.StravaWebhookSubscriptionId}.");
            }
        }
    }
}
