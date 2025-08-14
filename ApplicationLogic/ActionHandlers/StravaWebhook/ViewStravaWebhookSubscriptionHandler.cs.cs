using AutoMapper;
using Microsoft.Extensions.Configuration;
using SegmentSniper.Models.Strava.Webhook;
using SegmentSniper.Services.StravaWebhook;
using StravaApiClient.Models.Webhook;
using StravaApiClient.Services.Webhook;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook
{
    public class ViewStravaWebhookSubscriptionHandler : IViewStravaWebhookSubscriptionHandler
    {
        private readonly IViewStravaWebhookSubscription _viewStravaWebhookSubscription;        
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public ViewStravaWebhookSubscriptionHandler(IViewStravaWebhookSubscription viewStravaWebhookSubscription, IConfiguration configuration, IMapper mapper)
        {
            _viewStravaWebhookSubscription = viewStravaWebhookSubscription;            
            _configuration = configuration;
            _mapper = mapper;
        }

        public async Task<ViewStravaWebhookSubscriptionRequest.Response> HandleAsync()
        {        
            var clientId = _configuration["StravaApiSettings-ClientId"];
            if (string.IsNullOrWhiteSpace(clientId))
            {
                throw new ArgumentException("Strava Client ID is not configured.");
            }

            var clientSecret = _configuration["StravaApiSettings-ClientSecret"];
            if (string.IsNullOrWhiteSpace(clientSecret))
            {
                throw new ArgumentException("Strava Client Secret is not configured.");
            }

            try
            {
                var response = await _viewStravaWebhookSubscription.ExecuteAsync(new ViewStravaWebhookSubscriptionContract(clientId, clientSecret));

                if (response == null || response.ViewSubscriptionApiResponse.Id == null)
                {
                    throw new InvalidOperationException("No Strava webhook subscription found.");
                }


                var responseModel = _mapper.Map<ViewSubscriptionApiResponse, ViewSubscriptionResponseModel>(response.ViewSubscriptionApiResponse);

               if( responseModel == null)
                {
                    throw new InvalidOperationException("Failed to map Strava webhook subscription response.");
                }

                return new ViewStravaWebhookSubscriptionRequest.Response(responseModel);                
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while viewing the Strava webhook subscription.", ex);
            }
        }
    }
}
