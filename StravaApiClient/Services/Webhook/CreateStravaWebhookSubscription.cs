namespace StravaApiClient.Services.Webhook
{
    public class CreateStravaWebhookSubscription : ICreateStravaWebhookSubscription
    {
        private readonly IStravaRequestClient _stravaRequestClient;

        public CreateStravaWebhookSubscription(IStravaRequestClient stravaRequestClient)
        {
            _stravaRequestClient = stravaRequestClient;
        }
        public async Task<CreateStravaWebhookSubscriptionContract.Result> ExecuteAsync(CreateStravaWebhookSubscriptionContract contract)
        {
            ValidateContract(contract);
            var parameters = new CreateStravaWebhookSubscriptionData(contract.VerifyToken, contract.CallbackUrl, contract.ClientId, contract.ClientSecret)
            {
                VerifyToken = contract.VerifyToken,
                CallbackUrl = contract.CallbackUrl,
                ClientId = contract.ClientId,
                ClientSecret = contract.ClientSecret
            };

           var apiResponse =  await _stravaRequestClient.PostAsync<CreateStravaWebhookSubscriptionData, HttpResponseMessage>("push_subscriptions", parameters);

            return new CreateStravaWebhookSubscriptionContract.Result { Success = apiResponse.IsSuccessStatusCode };
        }

        private void ValidateContract(CreateStravaWebhookSubscriptionContract contract)
        {
            if (contract == null) throw new ArgumentNullException(nameof(contract));
            if (string.IsNullOrEmpty(contract.VerifyToken)) throw new ArgumentException("Verify token must be provided", nameof(contract.VerifyToken));
            if (string.IsNullOrEmpty(contract.CallbackUrl)) throw new ArgumentException("Callback URL must be provided", nameof(contract.CallbackUrl));
            if (string.IsNullOrEmpty(contract.ClientId)) throw new ArgumentException("Client ID must be provided", nameof(contract.ClientId));
            if (string.IsNullOrEmpty(contract.ClientSecret)) throw new ArgumentException("Client secret must be provided", nameof(contract.ClientSecret));
        }
    }
}





//using StravaApiClient.Models.Misc;

//namespace StravaApiClient.Services.Gear
//{
//    public class GetGearById : IGetGearById
//    {
//        private readonly IStravaRequestClient _stravaRequestClient;

//        public GetGearById(IStravaRequestClient stravaRequestClient)
//        {
//            _stravaRequestClient = stravaRequestClient;
//        }

//        public async Task<GetGearByIdContract.Result> ExecuteAsync(GetGearByIdContract contract)
//        {
//            ValidateContract(contract);

//            var apiResponse = await _stravaRequestClient.GetAsync<DetailedGearApiModel>($"gear/{contract.GearId}");
//            return new GetGearByIdContract.Result { DetailedGearApiModel = apiResponse };
//        }

//        private void ValidateContract(GetGearByIdContract contract)
//        {
//            if (contract == null) throw new ArgumentNullException(nameof(contract));
//            if (string.IsNullOrEmpty(contract.GearId)) throw new ArgumentException("Gear Id must be provided", nameof(contract.GearId));
//        }
//    }
//}
