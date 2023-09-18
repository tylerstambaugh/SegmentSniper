using StravaApiClient.Configuration;

namespace SegmentSniper.Api.Configuration
{
    public class StravaRequestClientConfiguration : IStravaRequestClientConfiguration
    {
        private readonly IConfiguration _appConfig;
        private readonly StravaApiSettings _stravaApiSettings;
        

        public StravaRequestClientConfiguration(IConfiguration appConfig) 
        {
            _appConfig = appConfig;

            _stravaApiSettings = _appConfig.GetSection("StravaApiSettings").Get<StravaApiSettings>();
        }


        string ClientId => _stravaApiSettings.ClientId;
        string ClientSecret => _stravaApiSettings.ClientSecret;
        string BaseUrl => _stravaApiSettings.BaseUrl;
        string OauthBaseUrl => _stravaApiSettings.OAuthBaseUrl;
    }

    public class StravaApiSettings
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string BaseUrl { get; set; }
        public string OAuthBaseUrl { get; set; }

    }
}


//{
//    "StravaAPICodes": {
//        "ClientId": 