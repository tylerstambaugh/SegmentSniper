using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;

namespace SegmentSniper.Services.StravaWebhook
{
    public class GetStravaWebhookSubscriptionId : IGetStravaWebhookSubscriptionId
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public GetStravaWebhookSubscriptionId(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<GetStravaWebhookSubscriptionIdContract.Result> ExecuteAsync(GetStravaWebhookSubscriptionIdContract contract)
        {            
            var subscription = await _segmentSniperDbContext.StravaWebhookSubscription.FirstOrDefaultAsync();
            if (subscription != null)
            {
                return new GetStravaWebhookSubscriptionIdContract.Result(subscription.StravaWebhookSubscriptionId);
            }
            return new GetStravaWebhookSubscriptionIdContract.Result(0);
        }
    }
}
