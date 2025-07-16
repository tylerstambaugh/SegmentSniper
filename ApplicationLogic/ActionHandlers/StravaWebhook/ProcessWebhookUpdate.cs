using SegmentSniper.Services.User;
using System.Text.Json.Serialization;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook
{
    public class ProcessWebhookUpdate : IProcessWebhookUpdate
    {
        private readonly IGetUserByStravaAthleteId _getUserByStravaAthleteId;

        public ProcessWebhookUpdate(IGetUserByStravaAthleteId getUserByStravaAthleteId)
        {
            _getUserByStravaAthleteId = getUserByStravaAthleteId;
        }

        public async Task<bool> HandleAsync(WebhookUpdate webhookUpdate)
        {

            var user = await _getUserByStravaAthleteId.ExecuteAsync(new GetUserByStravaAthleteIdContract(webhookUpdate.OwnerId));
            if (webhookUpdate.ObjectType == "activity" && webhookUpdate.AspectType == "update")
            {

                //handle activity updates
            }


            throw new NotImplementedException("Processing webhook updates is not implemented yet.");

        }
    }


}
