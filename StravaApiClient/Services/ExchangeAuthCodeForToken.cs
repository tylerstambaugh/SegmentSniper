using SegmentSniper.Models.Models.Strava.Token;
using StravaApiClient.Configuration;

namespace StravaApiClient.Services
{
    public class ExchangeAuthCodeForToken : IExchangeAuthCodeForToken
    {
        private readonly IStravaRequestClient _stravaRequestClient;
        private readonly IStravaRequestClientConfiguration _config;

        public ExchangeAuthCodeForToken(IStravaRequestClient stravaRequestClient, IStravaRequestClientConfiguration config)
        {
            _stravaRequestClient = stravaRequestClient;
            _config = config;
        }

        public async Task<ExchangeAuthCodeForTokenContract.Result> ExecuteAsync(ExchangeAuthCodeForTokenContract contract)
        {
            var url = $"{_config.OauthBaseUrl}/token?client_id={_config.ClientId}&client_secret={_config.ClientSecret}&code={contract.AuthCode}&grant_type=authorization_code";            
            
            var apiResponse = await _stravaRequestClient.PostExchangeAuthCodeForToken<StravaApiToken>(url);

            return new ExchangeAuthCodeForTokenContract.Result(apiResponse);
        }

        public void ValidateContract(ExchangeAuthCodeForTokenContract contract)
        {
            if(contract == null)
                throw new ArgumentNullException(nameof(contract));

            if(string.IsNullOrWhiteSpace(contract.AuthCode))
                throw new ArgumentException(nameof(contract.AuthCode));
        }
    }
}
