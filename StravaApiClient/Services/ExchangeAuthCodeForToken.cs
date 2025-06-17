using AutoMapper;
using SegmentSniper.Models.Models.Strava.Token;
using StravaApiClient.Configuration;
using StravaApiClient.Models.Token;

namespace StravaApiClient.Services
{
    public class ExchangeAuthCodeForToken : IExchangeAuthCodeForToken
    {
        private readonly IStravaRequestClient _stravaRequestClient;
        private readonly IStravaRequestClientConfiguration _config;
        private readonly IMapper _mapper;

        public ExchangeAuthCodeForToken(IStravaRequestClient stravaRequestClient, IStravaRequestClientConfiguration config, IMapper mapper)
        {
            _stravaRequestClient = stravaRequestClient;
            _config = config;
            _mapper = mapper;
        }

        public async Task<ExchangeAuthCodeForTokenContract.Result> ExecuteAsync(ExchangeAuthCodeForTokenContract contract)
        {
            var url = $"{_config.OauthBaseUrl}/token?client_id={_config.ClientId}&client_secret={_config.ClientSecret}&code={contract.AuthCode}&grant_type=authorization_code";            
            
            var apiResponse = await _stravaRequestClient.PostExchangeAuthCodeForToken<StravaTokenApiModel>(url);

            var tokenResult = _mapper.Map<StravaTokenApiModel, StravaTokenModel>(apiResponse);

            return new ExchangeAuthCodeForTokenContract.Result(tokenResult);
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
