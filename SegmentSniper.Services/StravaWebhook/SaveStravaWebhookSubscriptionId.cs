using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.StravaWebhookSubscription;

namespace SegmentSniper.Services.StravaWebhook
{
    public class SaveStravaWebhookSubscriptionId : ISaveStravaWebhookSubscriptionId
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public SaveStravaWebhookSubscriptionId(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<SaveStravaWebhookSubscriptionIdContract.Result> ExecuteAsync(SaveStravaWebhookSubscriptionIdContract contract)
        {
            ValidateContract(contract);

            var existingSubscription = await _segmentSniperDbContext.StravaWebhookSubscription.FirstOrDefaultAsync();

            if(existingSubscription != null)
            {
               throw new ApplicationException("A Strava Webhook Subscription ID already exists in the system. Please delete the existing subscription before registering a new one.");
            }

            StravaWebhookSubscription subscrpitionoSave = new StravaWebhookSubscription
            {
                StravaWebhookSubscriptionId = contract.StravaWebhookSubscriptionId,
                CreatedDate = DateTime.UtcNow
            };

            _segmentSniperDbContext.StravaWebhookSubscription.Add(subscrpitionoSave);
            var saveResult = await _segmentSniperDbContext.SaveChangesAsync();
            return new SaveStravaWebhookSubscriptionIdContract.Result(saveResult == 1);
        }

        private void ValidateContract(SaveStravaWebhookSubscriptionIdContract contract)
        {
            if (contract == null) throw new ArgumentNullException(nameof(contract));
            if (contract.StravaWebhookSubscriptionId <= 0) throw new ArgumentException("Strava Webhook Subscription ID must be a positive integer", nameof(contract.StravaWebhookSubscriptionId));
        }
    }
}
